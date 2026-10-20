const corsHeaders={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, POST, PUT, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization'};
const json=(data,status=200,extra={})=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json;charset=utf-8',...corsHeaders,...extra}});
const safeJson=async request=>{try{return await request.json()}catch{return null}};
async function signature(s,key){const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(key),'HMAC',{name:'HMAC',hash:'SHA-256'},false,['sign']);const buf=await crypto.subtle.sign('HMAC',k,new TextEncoder().encode(s));return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('')}
async function authenticated(request,env){if(!env.ADMIN_SECRET)return false;const value=(request.headers.get('Authorization')||'').replace(/^Bearer /,'');const [expires,mac]=value.split('.');if(!/^\d+$/.test(expires||'')||Number(expires)<Date.now()||!mac)return false;return (await signature(expires,env.ADMIN_SECRET))===mac;}
function validQuote(v){return v && String(v.name||'').trim().length>=2 && /^[0-9+()\s-]{8,22}$/.test(String(v.phone||'')) && String(v.type||'').length>0 && /^\d{4}-\d{2}-\d{2}$/.test(String(v.event_date||'')) && Number(v.guests)>=1 && Number(v.guests)<=50000 && String(v.notes||'').length<=2500}
export default {async fetch(request,env){try{
 const url=new URL(request.url),p=url.pathname;
 if(request.method==='OPTIONS')return new Response(null,{headers:corsHeaders});
 if(p==='/api/health')return json({ok:true,service:'MBR Eventos API',database:!!env.DB,images:!!env.IMAGES});
 if(!env.DB)return json({error:'Base de datos no vinculada'},503);
 if(p==='/api/content'&&request.method==='GET'){const r=await env.DB.prepare('SELECT key,value FROM content').all();return json(Object.fromEntries((r.results||[]).map(x=>[x.key,JSON.parse(x.value)])))}
 if(p==='/api/quotes'&&request.method==='POST'){
  const v=await safeJson(request);if(!validQuote(v))return json({error:'Verifica nombre, teléfono, fecha, tipo de evento e invitados.'},400);
  if(v.website)return json({ok:true},200);
  const q=await env.DB.prepare('INSERT INTO quotes (name,phone,email,type,event_date,guests,notes) VALUES (?,?,?,?,?,?,?)').bind(String(v.name).trim().slice(0,120),String(v.phone).slice(0,22),String(v.email||'').slice(0,200),String(v.type).slice(0,80),String(v.event_date),Number(v.guests),String(v.notes||'').slice(0,2500)).run();
  const id=q.meta.last_row_id;return json({ok:true,id,folio:'MBR-'+String(id).padStart(6,'0')},201)
 }
 if(p==='/api/admin/login'&&request.method==='POST'){
  if(!env.ADMIN_PASSWORD||!env.ADMIN_SECRET)return json({error:'Acceso en configuración'},503);
  const ip=request.headers.get('CF-Connecting-IP')||'unknown';
  const client=await signature('admin-login:'+ip,env.ADMIN_SECRET);
  await env.DB.prepare('CREATE TABLE IF NOT EXISTS admin_login_limits (client TEXT PRIMARY KEY, attempts INTEGER NOT NULL DEFAULT 0, blocked_until INTEGER NOT NULL DEFAULT 0)').run();
  const now=Date.now(),entry=await env.DB.prepare('SELECT attempts,blocked_until FROM admin_login_limits WHERE client=?').bind(client).first();
  if(entry&&entry.blocked_until>now)return json({error:'Demasiados intentos. Intenta de nuevo en 15 minutos.'},429,{'Retry-After':String(Math.ceil((entry.blocked_until-now)/1000))});
  const data=await safeJson(request);
  const candidate=String(data?.password||'');
  if(!/^\d{4,6}$/.test(candidate)||candidate!==env.ADMIN_PASSWORD){
   const attempts=(entry?.blocked_until>now||!entry?.blocked_until?Number(entry?.attempts||0):0)+1;
   const blockedUntil=attempts>=5?now+15*60*1000:0;
   await env.DB.prepare('INSERT INTO admin_login_limits (client,attempts,blocked_until) VALUES (?,?,?) ON CONFLICT(client) DO UPDATE SET attempts=excluded.attempts,blocked_until=excluded.blocked_until').bind(client,attempts,blockedUntil).run();
   return json({error:blockedUntil?'Demasiados intentos. Intenta de nuevo en 15 minutos.':'Credenciales inválidas'},blockedUntil?429:401);
  }
  await env.DB.prepare('DELETE FROM admin_login_limits WHERE client=?').bind(client).run();
  const expires=String(Date.now()+2*60*60*1000);
  return json({token:expires+'.'+await signature(expires,env.ADMIN_SECRET)})
 }
 if(p.startsWith('/api/admin/')){
  if(!await authenticated(request,env))return json({error:'Acceso no autorizado'},401);
  if(p==='/api/admin/quotes'&&request.method==='GET'){const r=await env.DB.prepare('SELECT * FROM quotes ORDER BY id DESC LIMIT 300').all();return json(r.results||[])}
  if(p==='/api/admin/quotes/status'&&request.method==='PUT'){const d=await safeJson(request);if(!['nuevo','contactado','cotizado','confirmado','cancelado'].includes(d?.status))return json({error:'Estado inválido'},400);await env.DB.prepare('UPDATE quotes SET status=? WHERE id=?').bind(d.status,Number(d.id)).run();return json({ok:true})}
  if(p==='/api/admin/content'&&request.method==='PUT'){const d=await safeJson(request);if(!d||typeof d.key!=='string'||!/^[a-z0-9_-]{1,60}$/i.test(d.key)||JSON.stringify(d.value).length>100000)return json({error:'Contenido inválido'},400);await env.DB.prepare('INSERT INTO content(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=CURRENT_TIMESTAMP').bind(d.key,JSON.stringify(d.value)).run();return json({ok:true})}
  if(p==='/api/admin/quotes/note'&&request.method==='POST'){const d=await safeJson(request);if(!Number.isInteger(Number(d?.id))||!String(d.note||'').trim())return json({error:'Nota inválida'},400);await env.DB.prepare('INSERT INTO quote_notes(quote_id,note) VALUES (?,?)').bind(Number(d.id),String(d.note).slice(0,1200)).run();return json({ok:true})}
  if(p==='/api/admin/quotes/notes'&&request.method==='GET'){const r=await env.DB.prepare('SELECT * FROM quote_notes WHERE quote_id=? ORDER BY id DESC').bind(Number(url.searchParams.get('id'))).all();return json(r.results||[])}
 }
 return json({error:'Ruta no encontrada'},404)
 }catch(e){return json({error:'Error interno del servidor'},500)} }};
