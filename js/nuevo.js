const API='https://mariscos-eventos-api.venturahjorge.workers.dev';
const pics=['imagenes/eventos/ejemplo-1.svg','imagenes/eventos/ejemplo-2.svg','imagenes/eventos/ejemplo-3.svg','imagenes/eventos/ejemplo-4.svg','imagenes/eventos/ejemplo-5.svg'];
const defaults={cintillo:{texto:'Eventos y banquetes del mar a tu mesa... Donde servirte es un placer'},hero:{titulo:'Mariscos Boca del Río · Eventos & Banquetes',subtitulo:'Sabor, tradición y servicio para cada celebración.'},destacados:{titulo:'Momentos que perduran',subtitulo:'Celebraciones memorables',items:Array.from({length:10},(_,i)=>({titulo:'Experiencias gastronómicas',imagen:pics[i%5]}))},nosotros:{titulo:'Quiénes somos',subtitulo:'Tradición gastronómica y servicio profesional',descripcion:'Mariscos Boca del Río: servicio de alimentos y banquetes para celebraciones privadas y eventos empresariales.',valores:[{titulo:'Misión',texto:'Por definir por dirección'},{titulo:'Visión',texto:'Por definir por dirección'},{titulo:'Valores',texto:'Servicio, calidad y compromiso'},{titulo:'Trayectoria',texto:'Experiencia en eventos y banquetes'}]},celebraciones:{titulo:'Eventos y celebraciones',subtitulo:'Cotiza el formato ideal para tu evento',items:Array.from({length:10},(_,i)=>({titulo:['Bodas','XV años','Corporativos','Graduaciones','Cumpleaños'][i%5],imagen:pics[i%5]}))},servicios:{titulo:'Del mar a la mesa',subtitulo:'Tipos de servicio a tu elección',items:['Buffet de mariscos','Buffet mexicanísimo','Espadas','Espadas y mariscos','Menú emplatado','Menú personalizado','Bodas','XV años','Eventos empresariales','Cócteles y canapés','Desayunos ejecutivos','Banquetes especiales'].map((titulo,i)=>({titulo,imagen:pics[i%5]}))},eventos:{titulo:'Nuestros eventos',subtitulo:'Conoce nuestros montajes y servicios',items:[{titulo:'Recepción Star Médica Veracruz',fecha:'2020-01-01',descripcion:'Recepción para más de 400 médicos en Foro Boca, con vino, canapés y servicio de banquetes.',imagen:pics[1],imagenes:[pics[1]]},{titulo:'Boda para 400 personas',fecha:'',descripcion:'Celebración con servicio integral de banquetes y atención personalizada.',imagen:pics[2],imagenes:[pics[2]]}]},empresas:{titulo:'Empresas que confían en nosotros',subtitulo:'Algunos de nuestros clientes y aliados',items:[{titulo:'Hospital Star Médica Veracruz'},{titulo:'GPG Grupo Publicitario del Golfo'}]},contacto:{titulo:'Contacto y reservaciones',subtitulo:'Cotiza tu próximo evento',direccion:'Tepic 47, Col. Progreso, Xalapa, Veracruz',telefono:'2281615559',whatsapp:'522281615559',horario:'Horario por confirmar',correo:'',facebook:'',instagram:'',tiktok:'',x:''}};
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image=(u,fallback=pics[0])=>escapeHTML(typeof u==='string'&&u?u:fallback);const imgStyle=x=> 'object-position:'+Math.max(0,Math.min(100,Number(x.posX??50)))+'% '+Math.max(0,Math.min(100,Number(x.posY??50)))+'%;transform:scale('+Math.max(1,Math.min(3,Number(x.zoom||100)/100))+');';
function field(id,v){const el=document.getElementById(id);if(el)el.textContent=v??''}
function tile(x,withDate=false){return '<article class="tile"><img loading="lazy" decoding="async" style="'+imgStyle(x)+'" src="'+image(x.imagen)+'" alt="'+escapeHTML(x.titulo)+'"><div class="tile-content"><h3>'+escapeHTML(x.titulo)+'</h3>'+(withDate&&x.fecha?'<small>'+escapeHTML(x.fecha)+'</small>':'')+'<p>'+escapeHTML(x.descripcion||x.texto||'')+'</p></div></article>'}
function draw(d){for(const key of ['destacados','nosotros','celebraciones','servicios','eventos','empresas','contacto']){field(key+'-titulo',d[key]?.titulo);field(key+'-subtitulo',d[key]?.subtitulo)}const brandLogo=document.getElementById('brand-logo');if(brandLogo){brandLogo.hidden=!d.hero.logo;if(d.hero.logo)brandLogo.src=d.hero.logo}field('hero-titulo',d.hero.titulo);field('hero-subtitulo',d.hero.subtitulo);field('cintillo-texto',d.cintillo.texto);field('nosotros-descripcion',d.nosotros.descripcion);for(const k of ['destacados','celebraciones']){document.getElementById('carousel-'+k).innerHTML=(d[k].items||[]).slice(0,10).map(x=>'<a class="slide" href="#cotizar"><img loading="lazy" decoding="async" src="'+image(x.imagen)+'" alt="'+escapeHTML(x.titulo)+'"><h3>'+escapeHTML(x.titulo)+'</h3></a>').join('')}['destacados','celebraciones'].forEach(k=>iniciarCarrusel(document.getElementById('carousel-'+k)));document.getElementById('valores').innerHTML=(d.nosotros.valores||[]).map(x=>'<article class="tile tile-content"><h3>'+escapeHTML(x.titulo)+'</h3><p>'+escapeHTML(x.texto)+'</p></article>').join('');document.getElementById('servicios-grid').innerHTML=d.servicios.items.slice(0,12).map(x=>tile(x)).join('');document.getElementById('eventos-grid').innerHTML=d.eventos.items.map((x,i)=>'<button class="event-btn" data-event="'+i+'" style="border:0;background:none;color:inherit;padding:0;text-align:left;cursor:pointer">'+tile(x,true)+'</button>').join('');document.querySelectorAll('[data-event]').forEach(b=>b.onclick=()=>{const x=d.eventos.items[Number(b.dataset.event)];document.getElementById('detalle-evento').hidden=false;document.getElementById('detalle-evento').innerHTML='<h3>'+escapeHTML(x.titulo)+'</h3><p>'+escapeHTML(x.descripcion||'')+'</p><div class="cards">'+(x.imagenes||[x.imagen]).slice(0,10).map(u=>'<a target="_blank" rel="noopener" href="'+image(u)+'"><img loading="lazy" decoding="async" src='+image(u)+'" alt="'+escapeHTML(x.titulo)+'"></a>').join('')+'</div>';document.getElementById('detalle-evento').scrollIntoView({behavior:'smooth'})});document.getElementById('empresas-grid').innerHTML=d.empresas.items.map(x=>'<article class="tile">'+(x.imagen?'<img loading="lazy" decoding="async" src="'+image(x.imagen)+'" alt="'+escapeHTML(x.titulo)+'">':'')+'<p>'+escapeHTML(x.titulo)+'</p></article>').join('');field('contacto-direccion',d.contacto.direccion);field('contacto-horario',d.contacto.horario);const email=String(d.contacto.correo||'').trim(),emailwrap=document.getElementById('contacto-email'),emailanchor=document.getElementById('contacto-correo');emailwrap.hidden=!email;if(email){emailanchor.textContent=email;emailanchor.href='mailto:'+email;}const socialPaths={
facebook:'<path d="M15 8h-3V6.5c0-.8.5-1 1.1-1H15V2.2A24 24 0 0 0 12.4 2C9.7 2 8 3.6 8 6.6V8H5v4h3v10h4V12h3l.5-4H12V6.8c0-.5.2-.8.9-.8H15z" fill="currentColor"/>',
instagram:'<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>',
tiktok:'<path d="M14.5 2h3c.3 3 1.7 4.7 4.5 4.9v3.1c-2.8 0-5-1-6.5-2.5v7.5c0 4.1-2.9 7-6.9 7A6.6 6.6 0 0 1 2 15.4c0-3.8 3-6.8 6.9-6.8.5 0 1 .1 1.5.2v3.4a3.2 3.2 0 0 0-1.5-.4 3.4 3.4 0 0 0-3.4 3.5c0 2 1.5 3.4 3.4 3.4 1.9 0 3.3-1.4 3.3-3.6V2z" fill="currentColor"/>',
x:'<path d="M3 3h4.3l5.3 6.6L18.3 3H21l-7.1 8.4L21.3 21H17l-5.8-7.3L4.9 21H2l7.9-9.3zM5.8 4.5l11.9 15h1L6.8 4.5z" fill="currentColor" fill-rule="evenodd"/>'
};
const socials=[['facebook','Facebook'],['instagram','Instagram'],['tiktok','TikTok'],['x','X']];
for(const container of ['contacto-redes','footer-redes']){
 const parent=document.getElementById(container);if(!parent)continue;parent.replaceChildren();
 for(const [key,label] of socials){
  const raw=String(d.contacto[key]||'').trim();let url='';
  try{const parsed=new URL(raw);if(['https:','http:'].includes(parsed.protocol))url=parsed.href}catch{}
  const node=document.createElement(url?'a':'span');node.className='social-icon'+(url?'':' social-pending');
  if(url){node.href=url;node.target='_blank';node.rel='noopener noreferrer';node.setAttribute('aria-label','Abrir '+label);node.title='Abrir '+label}
  else {node.title=label+' — enlace pendiente de configurar';node.setAttribute('aria-label',label+' — pendiente de configurar')}
  node.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+socialPaths[key]+'</svg>';
  parent.append(node)
 }
}
let tel=document.getElementById('contacto-telefono');tel.textContent=d.contacto.telefono;tel.href='tel:'+d.contacto.telefono.replace(/[^0-9+]/g,'');const wa='https://wa.me/'+String(d.contacto.whatsapp).replace(/\D/g,'');document.getElementById('contacto-whatsapp').href=wa;document.querySelector('.wa').href=wa;document.getElementById('contacto-mapa').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(d.contacto.direccion);if(d.cintillo.imagen)document.getElementById('cintillo').style.backgroundImage='linear-gradient(#071a2c88,#071a2c99),url("'+encodeURI(d.cintillo.imagen)+'")';if(d.hero.imagen)document.querySelector('.hero').style.backgroundImage='linear-gradient(90deg,#071c2df0,#071c2d9c),url("'+encodeURI(d.hero.imagen)+'")'}

/* Desplazamiento automático continuo de ambos carruseles, sin detenerse con el scroll de la página. */
const carruseles=new Map();
function iniciarCarrusel(node){
  if(!node)return;
  const previo=carruseles.get(node);
  if(previo)previo.stop();
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const items=[...node.children];if(!items.length)return;if(items.length===1){node.scrollLeft=0;node.style.overflowX='hidden';return}node.style.overflowX='auto';
  node.scrollLeft=0;
  // Repetir las tarjetas para completar la anchura y lograr un ciclo sin huecos.
  while(node.scrollWidth<node.clientWidth*2.2 && node.children.length<60){
    items.forEach(item=>{const clone=item.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.tabIndex=-1;node.appendChild(clone)});
  }
  const grupo=[...node.children];
  grupo.forEach(item=>{const clone=item.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.tabIndex=-1;node.appendChild(clone)});
  let last=0,frame=0,stopped=false,activePointers=0;
  const loop=now=>{
    if(stopped)return;
    if(last&&!document.hidden&&activePointers===0){
      node.scrollLeft+=Math.min((now-last)/1000,.075)*28;
      const copy=node.children[grupo.length];
      if(copy){const limit=copy.offsetLeft-node.children[0].offsetLeft;if(limit>0&&node.scrollLeft>=limit)node.scrollLeft-=limit}
    }
    last=now;frame=requestAnimationFrame(loop);
  };
  // Solo suspender durante el arrastre activo; un toque no activa pausas temporizadas.
  const down=()=>{activePointers++};
  const up=()=>{activePointers=0;last=performance.now()};
  node.addEventListener('pointerdown',down);
  window.addEventListener('pointerup',up);
  window.addEventListener('pointercancel',up);
  window.addEventListener('blur',up);
  frame=requestAnimationFrame(loop);
  carruseles.set(node,{stop:()=>{stopped=true;cancelAnimationFrame(frame);node.removeEventListener('pointerdown',down);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',up);window.removeEventListener('blur',up)}});

}

let data=structuredClone(defaults);async function load(){try{const res=await fetch(API+'/api/content');if(res.ok){const v=await res.json();for(const k in defaults)if(v[k])data[k]={...data[k],...v[k]}}}catch(e){}draw(data)}load();
document.getElementById('menu-toggle').onclick=()=>{const n=document.getElementById('navlinks'),open=n.classList.toggle('open');document.getElementById('menu-toggle').setAttribute('aria-expanded',String(open))};document.querySelectorAll('#navlinks a').forEach(a=>a.onclick=()=>{document.getElementById('navlinks').classList.remove('open');document.getElementById('menu-toggle').setAttribute('aria-expanded','false')});
document.getElementById('cotizar').addEventListener('submit',async e=>{e.preventDefault();const f=e.currentTarget,button=f.querySelector('button[type=submit]'),result=document.getElementById('quote-result');button.disabled=true;result.textContent='Registrando solicitud...';const x=Object.fromEntries(new FormData(f));x.guests=Number(x.guests);try{const res=await fetch(API+'/api/quotes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(x)}),r=await res.json();if(!res.ok||!r.folio)throw Error(r.error||'No se pudo registrar');result.textContent='Solicitud registrada: '+r.folio+'. Puedes enviar el resumen por WhatsApp.';let message='Solicitud '+r.folio+'%0A'+encodeURIComponent('Nombre: '+x.name+'\nTeléfono: '+x.phone+'\nTipo: '+x.type+'\nFecha: '+x.event_date+'\nInvitados: '+x.guests+'\nDetalles: '+(x.notes||''));const a=document.createElement('a');a.href='https://wa.me/'+data.contacto.whatsapp+'?text='+message;a.target='_blank';a.rel='noopener';a.textContent='Abrir WhatsApp para enviar';a.className='btn';result.append(' ',a);f.reset()}catch(err){result.textContent=err.message+'; intenta de nuevo.'}finally{button.disabled=false}});
