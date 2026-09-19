/* ============================================================
   DATOS DEL SITIO — MARISCOS BOCA DEL RÍO EVENTOS
   Este archivo se actualiza automáticamente desde el panel
   de administración (admin.html) o lo puedes editar a mano.
   ============================================================ */

const ADMIN_CLAVE = "mbr2026";

const EMPRESA = {
  nombre: "Mariscos Boca del Río Eventos",
  eslogan: "El sabor del mar en tus eventos más importantes",
  descripcion:
    "Somos un restaurante de mariscos con amplia experiencia en la organización de eventos: " +
    "banquetes empresariales, bodas, XV años y celebraciones. Llevamos el auténtico sabor del mar " +
    "a tu evento con menús a la medida, montaje profesional y atención personalizada.",
  logo: "imagenes/logo/logo-mbr.svg",   // También acepta logo-mbr.png si lo copias
  datos: [
    { etiqueta: "🦐 Especialidad", valor: "Mariscos y banquetes del mar" },
    { etiqueta: "🎉 Eventos",     valor: "Empresariales, bodas, XV años, cumpleaños" },
    { etiqueta: "👥 Capacidad",   valor: "Consultar según el evento" },
    { etiqueta: "📅 Servicio",    valor: "Eventos en sitio y a domicilio" },
  ],
  contacto: {
    direccion: "Tepic No. 47, Col. Progreso",
    telefono: "2281615559",                    // Mismo número de WhatsApp
    email: "",                                 // Sin correo por ahora (se oculta en el sitio)
    horario: "Horario por confirmar",
    whatsapp: "522281615559",                  // 52 (México) + 2281615559
    redes: [
      { nombre: "Facebook",  url: "#" },
      { nombre: "Instagram", url: "#" },
    ],
  },
};

/* ------------------------------------------------------------
   BANNER PRINCIPAL (arriba de la página)
   vacío = se usa el fondo azul degradado por defecto.
   ------------------------------------------------------------ */
const BANNER = {
  imagen: "",   // Ej: "imagenes/eventos/mi-banner.jpg"
};

/* ------------------------------------------------------------
   FOTOS DESTACADAS (cinta animada debajo del título)
   Máximo 5. Se administran desde admin.html.
   ------------------------------------------------------------ */
const PROMOS = [
  "imagenes/promos/promo-1.svg",
  "imagenes/promos/promo-2.svg",
  "imagenes/promos/promo-3.svg",
  "imagenes/promos/promo-4.svg",
  "imagenes/promos/promo-5.svg",
];

/* ------------------------------------------------------------
   EVENTOS REALIZADOS
   Se agregan automáticamente desde admin.html.
   También puedes copiar un bloque { ... } y editarlo a mano.
   ------------------------------------------------------------ */
const EVENTOS = [
  {
    titulo: "Próximamente",
    fecha: "",
    descripcion: "Estamos preparando la galería de nuestros eventos. Vuelve pronto.",
    portada: "",
    fotos: [],
  },
];

/* ------------------------------------------------------------
   LOGOS DE EMPRESAS CLIENTES
   Se agregan automáticamente desde admin.html.
   ------------------------------------------------------------ */
const CLIENTES = [];
