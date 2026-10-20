# Especificación funcional — Mariscos Boca del Río Eventos y Banquetes

Estado: alcance acordado, pendiente implementación y pruebas. Sitio de referencia: https://seafood-banquet-dynamic.supercoolpreview.com/

## Principios
- Web responsive Mobile First para celulares (>=320px), tabletas y computadoras, accesible con ratón, teclado y táctil.
- Imagen institucional azul marino, dorado y blanco; eslogan oficial: "Donde Servirte es un placer".
- Todas las secciones contarán con título y subtítulo configurables desde administrador.
- NO incluir claves, tokens ni credenciales en archivos enviados al navegador.
- No modificar la rama main ni el sitio de Avan Tours hasta pruebas y autorización.

## Estructura pública (orden)
1. Cintillo superior con imagen, texto, altura, oscurecimiento y encuadre administrables.
2. Menú sticky, identidad/logo configurable y botones WhatsApp y Cotiza tu evento.
3. Portada con título, subtítulo, logo e imagen administrables y llamadas a la acción.
4. Carrusel promocional dinámico de hasta 10 imágenes con edición, zoom/recorte/posición.
5. Quiénes somos, misión, visión, valores, editables.
6. Carrusel Eventos y Celebraciones de hasta 10 imágenes, títulos y enlaces a cotización.
7. Galería fija de hasta 12 imágenes para tipos de servicio, con nombres y descripciones.
8. Eventos realizados: tarjetas con título, fecha, portada, descripción; cada evento con hasta 10 imágenes en galería de detalle. Número de eventos extensible.
9. Empresas que confían en nosotros: logos, nombres y gestión de orden.
10. Contacto y reservaciones: domicilio, teléfono, correo, horarios, mapa Cómo llegar, WhatsApp y formulario de cotización.
11. Pie de página con acceso a administración y datos institucionales.

## Edición de imágenes
- En administrador: subir, reemplazar, quitar, orden y texto alternativo; interfaz de recorte/zoom/reposición; conservar versiones apropiadas para móvil/escritorio.
- Ícono lápiz en contenido público solo visible a sesión autorizada, nunca mediante contraseña expuesta en JS.
- Almacenamiento recomendado: Cloudflare R2 con validación de formatos, tamaños, permisos y acceso controlado.

## Administración
- Acceso privado con autenticación de servidor, sesiones protegidas y gestión segura de contraseña.
- Módulos: cintillo, identidad, portada, carruseles, textos/institucional, tipos de servicio, eventos, empresas, contacto/WhatsApp, cotizaciones y seguridad.
- Estados y auditoría básica de cambios; publicación en sitio sin editar archivos a mano.
- D1 para contenido estructurado, contactos y solicitudes; Workers/API para validaciones y seguridad.

## Formulario de cotización
- Campos: nombre, teléfono/WhatsApp, correo opcional, tipo de evento, fecha, cantidad de invitados, descripción y consentimiento de privacidad.
- Validación servidor, protección anti-spam, folio único transaccional, fecha de solicitud y almacenamiento en D1.
- Estados: nuevo, contactado, cotizado, confirmado, cancelado; notas e historial de seguimiento.
- WhatsApp opción inicial: al guardar, mostrar botón para abrir WhatsApp con folio y datos prellenados (el usuario confirma el envío).
- Envío automático/proactivo por WhatsApp requiere WhatsApp Business Platform/API y autorización/configuración adicional. No afirmar envíos automáticos sin esa integración.
- Evitar guardar datos personales innecesarios; proteger acceso, definir aviso de privacidad.

## Calidad y pruebas
- Pantallas 320, 375, 390, 768, 1024, 1440px y tablet horizontal/vertical.
- Carruseles con swipe, pausas, reducción de movimiento; imágenes optimizadas y carga diferida.
- Pruebas de enlaces, formularios, permisos de administración, accesibilidad básica, errores y carga móvil.

## Plan de implementación
1. Auditoría del código existente (html/css/js y datos) y limpieza de duplicados sin pérdida.
2. Maquetación responsive nueva en rama desarrollo-sitio-responsive.
3. Backend Workers, D1, R2, autenticación.
4. CMS de contenido y editor de imágenes.
5. Cotizaciones y seguimiento, conexión WhatsApp.
6. QA, preview, aprobación y despliegue final.

Datos a confirmar antes de publicar: logo oficial, fotos autorizadas, textos misión/visión/valores, redes, teléfono de WhatsApp para cotizaciones, correo, dirección, horarios y aviso de privacidad.
