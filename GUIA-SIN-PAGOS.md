# Publicación sin tarjeta ni pagos — Mariscos Boca del Río

## Estado de la alternativa gratuita
- El frontend de pruebas está en Cloudflare Workers y el código en GitHub.
- Cotizaciones y contenido pueden guardarse en Cloudflare D1.
- R2 no está activado y NO se requiere para continuar con la vista preliminar.
- No se contratan plataformas ni se solicita registrar tarjeta.

## Subida de imágenes sin tarjeta — procedimiento inicial
1. Abrir el repositorio Github `venturahjorge-cmyk/mariscos-boca-del-rio`, rama `desarrollo-sitio-responsive`.
2. Ir a `imagenes/eventos/`, o usar subcarpetas para logotipos y empresas.
3. Usar **Add file → Upload files**, elegir fotos optimizadas, y confirmar en la rama de desarrollo.
4. Copiar la URL pública del archivo usando `https://raw.githubusercontent.com/venturahjorge-cmyk/mariscos-boca-del-rio/desarrollo-sitio-responsive/imagenes/eventos/archivo.jpg`.
5. Pegar la URL en el editor de imágenes del panel y ajustar zoom/posición; guardar contenido después de configurar la autenticación.
6. Evitar fotos y datos sensibles; el repositorio actual es público. Revisar permisos de uso comercial de imágenes.

## Requisitos pendientes importantes
- Configurar manualmente en Cloudflare Workers > mariscos-eventos-api > Settings > Variables and Secrets los secretos de servidor `ADMIN_PASSWORD` y `ADMIN_SECRET` (valores aleatorios robustos). No ponerlos en GitHub o variables públicas.
- Activar una solución de carga directa sin tarjeta en una siguiente etapa, solo cuando pueda verificarse segura. Editar una URL y previsualizar el archivo NO equivale a subirlo directamente a un almacenamiento permanente.
- Verificar el funcionamiento público de la vista previa, probar los formularios y habilitar avisos de privacidad antes de lanzar a clientes.
- El WhatsApp actual abre un texto prellenado y requiere que el visitante envíe el mensaje. No existe envío automático sin API externa.
