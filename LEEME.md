# 🦐 Sitio web — Mariscos Boca del Río Eventos

Sitio para mostrar la empresa y la galería de eventos, con **panel de administración**
para que puedas agregar eventos, subir fotos y logos de clientes **sin tocar código**.

---

## 1. Estructura de carpetas

```
sitio/
├── index.html            ← página pública
├── admin.html            ← 🔑 panel de administración
├── css/estilos.css       ← diseño
├── js/datos.js           ← datos del sitio (el panel lo actualiza)
├── js/funciones.js       ← no tocar
└── imagenes/
    ├── logo/             ← logo-mbr.png va aquí
    ├── eventos/          ← fotos de eventos
    └── clientes/         ← logos de clientes
```

## 2. 🔑 Panel de administración

Ábrelo desde el enlace **"Acceso administrador"** al pie de la página, o directo en `admin.html`.

**Contraseña: `mbr2026`** (la puedes cambiar en la línea `ADMIN_CLAVE` de `js/datos.js`)

### Lo que puedes hacer desde el panel:

| Sección | Qué hace |
|---|---|
| 🏢 Datos de la empresa | Nombre, eslogan, descripción, teléfono, WhatsApp, dirección, horario y **logo** |
| ➕ Nuevo evento | Título, fecha, descripción y **subir fotos arrastrándolas** (la primera es la portada) |
| 🗓️ Eventos publicados | Editar o borrar eventos existentes |
| 🤝 Clientes | Agregar empresas con logo o solo el nombre (muestra iniciales) |
| 💾 Publicar cambios | Descargar el `datos.js` actualizado para publicarlo |

## 3. 📤 Cómo publicar cambios (3 pasos)

1. En el panel, haz clic en **"⬇️ Descargar datos.js actualizado"**.
2. Ve a tu repositorio en **github.com** → archivo `js/datos.js` → ícono de lápiz ✏️ →
   borra todo, pega el contenido nuevo → **Commit changes**.
3. Espera 1 minuto: el sitio público se actualiza solo.

> **Importante:** mientras trabajas, los cambios se guardan en tu navegador.
> No borres los datos del navegador (o descarga el `datos.js` antes).

## 4. 🌐 Poner el sitio en línea GRATIS (una sola vez)

**Opción fácil — Netlify Drop:**
1. Entra a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta completa del sitio.
3. Te da una dirección al instante.

**Opción permanente — GitHub Pages:**
1. Crea cuenta gratis en [github.com](https://github.com).
2. Crea un repositorio público (ej. `mariscos-boca-del-rio`).
3. Sube todos los archivos (Add file → Upload files).
4. Settings → Pages → Source: rama `main`, carpeta `/ (root)` → Save.
5. Tu sitio queda en `https://tuusuario.github.io/mariscos-boca-del-rio/`.

## 5. 📱 Código QR gratis

Con la dirección lista, abre:
```
https://quickchart.io/qr?text=https://TU-DIRECCION&size=600
```
Guarda la imagen y imprímela en mantel, menú o volantes. Son QR estáticos:
gratis, sin límite de escaneos y sin suscripciones.

## 6. 🖼️ Sobre el logo y las fotos

- **Logo:** el sitio busca `imagenes/logo/logo-mbr.png`. Copia ahí el archivo
  `logo-mbr.png` que está en tu carpeta de Descargas. Si no está, el sitio muestra
  un círculo con las iniciales **MBR** automáticamente (nada se rompe).
  También puedes subirlo directo desde el panel (sección Datos de la empresa).
- **Fotos:** el panel las comprime automáticamente a máx. 1400px para que carguen rápido.
- Funciona bien hasta ~40 fotos dentro del `datos.js`. Si necesitas muchas más,
  súbelas a `imagenes/eventos/` en GitHub y agrega las rutas a mano.

## 7. ✏️ Editar a mano (opcional)

`js/datos.js` es texto plano: puedes abrirlo con el Bloc de notas y editar
teléfono, WhatsApp, eventos, etc. El panel y el archivo usan el mismo formato.

## 8. 🖥️ Probar en tu computadora

Abre `index.html` con doble clic. Para el panel, también funciona con doble clic en `admin.html`
(en algunos navegadores el modo archivo restringe las fotos subidas; si pasa eso, abre con
Chrome o usa un servidor local). Al subirlo a internet funciona todo al 100%.
