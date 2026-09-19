/* ============================================================
   FUNCIONES DEL SITIO — no necesitas editar este archivo.
   Carga los datos (de admin.html/localStorage si existen) y
   arma las secciones automáticamente.
   ============================================================ */

(function () {
  "use strict";

  const CLAVE_ALMACEN = "mbr_datos_sitio_v1";

  /* ---------- Datos: los de datos.js o los guardados por admin.html ---------- */
  let empresa = EMPRESA;
  let eventos = EVENTOS || [];
  let clientes = CLIENTES || [];

  try {
    const guardado = localStorage.getItem(CLAVE_ALMACEN);
    if (guardado) {
      const d = JSON.parse(guardado);
      if (d && d.EMPRESA) {
        empresa = d.EMPRESA;
        eventos = d.EVENTOS || [];
        clientes = d.CLIENTES || [];
      }
    }
  } catch (e) { /* sin datos guardados, se usan los de datos.js */ }

  /* ---------- Utilidades ---------- */
  const $ = (sel) => document.querySelector(sel);

  const iniciales = (texto) =>
    String(texto)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join("");

  const esc = (texto) =>
    String(texto).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  /* ---------- Marca / logo / nosotros ---------- */
  function pintarMarca() {
    $("#marca-nombre").textContent = empresa.nombre;
    $("#pie-nombre").textContent = empresa.nombre;
    $("#hero-titulo").textContent = `Bienvenido a ${empresa.nombre}`;
    $("#hero-eslogan").textContent = empresa.eslogan;
    document.title = `${empresa.nombre} — Eventos y Servicios`;

    // Fallback si el logo no existe todavía: muestra las iniciales
    $("#logo-empresa").addEventListener("error", function () {
      this.replaceWith(Object.assign(document.createElement("span"), {
        className: "logo-fallback",
        textContent: iniciales(empresa.nombre),
      }));
    });
    $("#hero-logo").addEventListener("error", function () {
      this.replaceWith(Object.assign(document.createElement("span"), {
        className: "logo-fallback grande",
        textContent: iniciales(empresa.nombre),
      }));
    });

    $("#nosotros-texto").textContent = empresa.descripcion;

    $("#nosotros-datos").innerHTML = empresa.datos
      .map((d) => `
        <div class="dato">
          <div class="dato-etiqueta">${esc(d.etiqueta)}</div>
          <div class="dato-valor">${esc(d.valor)}</div>
        </div>`)
      .join("");
  }

  /* ---------- Contacto ---------- */
  function pintarContacto() {
    const c = empresa.contacto;
    $("#contacto-direccion").textContent = c.direccion;
    $("#contacto-telefono").textContent = c.telefono;
    $("#contacto-horario").textContent = c.horario;

    // Oculta la fila de correo si no hay email configurado
    const filaEmail = $("#contacto-email").closest(".contacto-fila");
    if (c.email) {
      $("#contacto-email").textContent = c.email;
      filaEmail.classList.remove("oculto");
    } else {
      filaEmail.classList.add("oculto");
    }

    // A números mexicanos de 10 dígitos se les antepone 52 para llamadas
    const telLimpio = String(c.telefono).replace(/\D/g, "");
    const telConLada = telLimpio.length === 10 ? "52" + telLimpio : telLimpio;
    $("#boton-llamar").href = `tel:+${telConLada}`;
    $("#boton-whatsapp").href =
      `https://wa.me/${String(c.whatsapp).replace(/\D/g, "")}` +
      `?text=${encodeURIComponent("Hola, quiero información sobre un evento 🎉")}`;

    $("#contacto-redes").innerHTML = (c.redes || [])
      .filter((r) => r.url && r.url !== "#")
      .map(
        (r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener"
                   class="boton boton-borde boton-chico">${esc(r.nombre)}</a>`
      )
      .join("");
  }

  /* ---------- Eventos ---------- */
  let indiceVisor = 0;
  let fotosActuales = [];

  function pintarEventos() {
    const cont = $("#lista-eventos");
    if (!eventos.length) {
      $("#sin-eventos").classList.remove("oculto");
      return;
    }
    $("#sin-eventos").classList.add("oculto");

    cont.innerHTML = eventos.map((ev, i) => {
      const sinFotos = !ev.fotos || !ev.fotos.length;
      return `
      <article class="tarjeta-evento ${sinFotos ? "tarjeta-proxima" : ""}"
               data-indice="${i}" ${sinFotos ? "" : 'tabindex="0" role="button"'}
               aria-label="${sinFotos ? esc(ev.titulo) : "Abrir galería de " + esc(ev.titulo)}">
        <div class="tarjeta-foto">
          ${ev.portada
            ? `<img src="${esc(ev.portada)}" alt="${esc(ev.titulo)}" loading="lazy"
                   onerror="this.remove();this.parentNode.classList.add('sin-foto')" />`
            : `<div class="tarjeta-proxima-icono">🌊</div>`}
          ${sinFotos ? "" : `<span class="tarjeta-foto-icono">📷</span>`}
        </div>
        <div class="tarjeta-cuerpo">
          <h3>${esc(ev.titulo)}</h3>
          ${ev.fecha ? `<p class="tarjeta-fecha">${esc(ev.fecha)}</p>` : ""}
          <p class="tarjeta-descripcion">${esc(ev.descripcion)}</p>
          ${sinFotos ? "" : `<span class="tarjeta-enlace">Ver galería →</span>`}
        </div>
      </article>`;
    }).join("");

    cont.querySelectorAll(".tarjeta-evento:not(.tarjeta-proxima)").forEach((tarjeta) => {
      const abrir = () => abrirVisor(Number(tarjeta.dataset.indice));
      tarjeta.addEventListener("click", abrir);
      tarjeta.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          abrir();
        }
      });
    });
  }

  /* ---------- Visor de fotos (lightbox) ---------- */
  function abrirVisor(indiceEvento) {
    fotosActuales = eventos[indiceEvento].fotos;
    indiceVisor = 0;
    mostrarFoto();
    $("#visor").classList.remove("oculto");
    document.body.style.overflow = "hidden";
  }

  function mostrarFoto() {
    const foto = fotosActuales[indiceVisor];
    const img = $("#visor-imagen");
    const falta = $("#visor-falta");
    falta.classList.add("oculto");
    img.style.opacity = 0;
    img.onload = () => { img.style.opacity = 1; };
    img.onerror = function () {
      this.removeAttribute("src");
      this.classList.add("oculto");
      falta.classList.remove("oculto");
    };
    img.classList.remove("oculto");
    img.src = foto.src;
    img.alt = foto.pie || "";
    $("#visor-pie").textContent = foto.pie || "";
    const hayVarias = fotosActuales.length > 1;
    $("#visor-ant").style.visibility = hayVarias ? "visible" : "hidden";
    $("#visor-sig").style.visibility = hayVarias ? "visible" : "hidden";
  }

  function siguienteFoto() {
    indiceVisor = (indiceVisor + 1) % fotosActuales.length;
    mostrarFoto();
  }

  function fotoAnterior() {
    indiceVisor = (indiceVisor - 1 + fotosActuales.length) % fotosActuales.length;
    mostrarFoto();
  }

  function cerrarVisor() {
    $("#visor").classList.add("oculto");
    document.body.style.overflow = "";
  }

  function prepararVisor() {
    $("#visor-cerrar").addEventListener("click", cerrarVisor);
    $("#visor-sig").addEventListener("click", siguienteFoto);
    $("#visor-ant").addEventListener("click", fotoAnterior);
    $("#visor").addEventListener("click", (e) => {
      if (e.target === $("#visor")) cerrarVisor();
    });
    document.addEventListener("keydown", (e) => {
      if ($("#visor").classList.contains("oculto")) return;
      if (e.key === "Escape") cerrarVisor();
      if (e.key === "ArrowRight") siguienteFoto();
      if (e.key === "ArrowLeft") fotoAnterior();
    });
  }

  /* ---------- Clientes ---------- */
  function pintarClientes() {
    const cont = $("#lista-clientes");
    if (!clientes.length) {
      cont.innerHTML = `<p class="clientes-vacio">Pronto publicaremos las empresas que han confiado en nosotros.</p>`;
      return;
    }
    cont.innerHTML = clientes
      .map((cl) => `
        <div class="tarjeta-cliente" data-nombre="${esc(cl.nombre)}">
          ${cl.logo
            ? `<img src="${esc(cl.logo)}" alt="Logo de ${esc(cl.nombre)}" loading="lazy" />`
            : `<span class="logo-fallback grande">${esc(iniciales(cl.nombre))}</span>`}
        </div>`)
      .join("");

    // Fallback si el logo falla al cargar
    cont.querySelectorAll(".tarjeta-cliente").forEach((tarjeta) => {
      const img = tarjeta.querySelector("img");
      if (!img) return;
      img.addEventListener("error", function () {
        tarjeta.innerHTML = `<span class="logo-fallback grande">${esc(iniciales(tarjeta.dataset.nombre))}</span>`;
      });
    });
  }

  /* ---------- Menú móvil ---------- */
  function prepararMenu() {
    const boton = $("#menu-boton");
    const menu = $("#menu");
    boton.addEventListener("click", () => menu.classList.toggle("abierto"));
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => menu.classList.remove("abierto"))
    );
  }

  /* ---------- Arranque ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    pintarMarca();
    pintarContacto();
    pintarEventos();
    pintarClientes();
    prepararVisor();
    prepararMenu();
    $("#pie-anio").textContent = new Date().getFullYear();
  });
})();
