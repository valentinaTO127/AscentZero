// ---------- Diapositivas de componentes (datos en componentes.js) ----------
const IMAGE_EXTENSIONS = ["png", "webp", "jpg", "jpeg"];

// Casillas de imagen: archivo esperado, etiqueta y si lleva fondo desenfocado
const IMAGE_CELLS = [
  { file: "concepto-3d", cell: 6, caption: "Concepto en 3D", backdrop: true },
  { file: "shading", cell: 3, caption: "Shading", backdrop: true },
  { file: "pixel-art", cell: 2, caption: "Versión Pixel Art-Render Final", backdrop: false },
];

// Bloque de texto del componente (título, función y descripción)
function componentInfo(component, number, extraClass = "") {
  return `
      <div class="grid__cell grid__cell--text ${extraClass}">
        <h3>${number}. ${component.title}:</h3>
        <p><strong>Función:</strong> ${component.purpose}</p>
        <p>${component.description}</p>
      </div>`;
}

// Diapositiva extra: el texto del componente, una frase grande y una sola imagen
function buildExtraSlide(component, number) {
  const section = document.createElement("section");
  section.className = "slide slide--extra";
  section.innerHTML = `
    <div class="extra__text">
      ${componentInfo(component, number, "extra__info")}
      <p class="extra__note">${component.extra.note}</p>
    </div>
    <div class="grid__cell grid__cell--image extra__image" data-src="assets/componente-${number}/${component.extra.image}">
      <img alt="${component.title}">
    </div>`;
  return section;
}

// Popups con los prompts usados en Vizcom (uno por texto), encima de la casilla que los abre.
// "area" es el área de la cuadrícula que ocupan (por defecto la casilla 4).
function popupsMarkup(prompts, area) {
  return `
      <div class="popups" role="dialog" aria-modal="true" aria-label="Prompts de Vizcom" tabindex="-1"
        ${area ? `style="grid-area: ${area}"` : ""} hidden>
        ${prompts
          .map(
            (prompt, i) => `
          <article class="popup">
            <span class="popup__step">Prompt ${i + 1}</span>
            <p>${prompt}</p>
          </article>`
          )
          .join("")}
      </div>`;
}

// Diapositiva única: texto (y frase) arriba, abajo una imagen ancha o una cuadrícula de
// tarjetas (<image>-1, <image>-2...), y un título en vertical
function buildSoloSlide(component, number) {
  const { image, note, sideTitle, cards } = component.solo;
  const base = `assets/componente-${number}/${image}`;

  const media = cards
    ? `
      <div class="solo__cards" style="--cols: ${cards.columns}">
        ${Array.from(
          { length: cards.count },
          (_, i) => `
        <div class="grid__cell variant" data-src="${base}-${i + 1}" data-no-backdrop>
          <img alt="${component.title} ${i + 1}">
        </div>`
        ).join("")}
      </div>`
    : `
      <div class="grid__cell grid__cell--image extra__image" data-src="${base}">
        <img alt="${component.title}">
      </div>`;

  const section = document.createElement("section");
  section.className = "slide slide--solo";
  section.innerHTML = `
    <div class="solo__main">
      <div class="solo__top">
        ${componentInfo(component, number, "extra__info")}
        ${note ? `<p class="extra__note">${note}</p>` : ""}
      </div>
      ${media}
    </div>
    <h2 class="side-title">${sideTitle}</h2>`;
  return section;
}

// Diapositiva de galería; cada casilla muestra su imagen galeria-K o, si no hay, su número
// (los números son los del boceto, en orden de lectura)
const GALLERY_CELLS = [1, 6, 3, 12, 7, 8, 9, 10, 11];

function buildGallerySlide(component, number) {
  const cells = GALLERY_CELLS.map((k) => {
    const { title, caption, prompts = [] } = component.gallery[k] ?? {};
    if (title) {
      return `
      <div class="grid__cell gallery__cell gallery__cell--${k} gallery__title">
        <h2>${title}</h2>
      </div>`;
    }

    const clickable = prompts.length > 0;
    const tag = clickable ? "button" : "div";
    return `
      <${tag} class="grid__cell grid__cell--image gallery__cell gallery__cell--${k}${caption ? "" : " gallery__cell--plain"}${clickable ? " grid__cell--clickable" : ""}"
        data-src="assets/componente-${number}/galeria-${k}" data-optional${clickable ? ` aria-haspopup="dialog"` : ""}>
        <img alt="${caption ?? ""}">
        <span class="gallery__number">${k}</span>
        ${caption ? `<span class="grid__caption">${caption}</span>` : ""}
        ${clickable ? `<span class="grid__hint">Click para ver los prompts</span>` : ""}
      </${tag}>
      ${clickable ? popupsMarkup(prompts, `g${k}`) : ""}`;
  }).join("");

  const section = document.createElement("section");
  section.className = "slide slide--grid";
  section.innerHTML = `<div class="gallery">${cells}</div>`;
  return section;
}

// Diapositiva de variantes: filas de tarjetas (imagen + etiqueta) y un título en vertical
function buildVariantsSlide(component, number) {
  const { title, caption, rows } = component.variants;
  let next = 1;
  const rowsMarkup = rows
    .map((count) => {
      const cards = Array.from({ length: count }, () => {
        const k = next++;
        return `
        <div class="grid__cell variant" data-src="assets/componente-${number}/variante-${k}"
          data-optional data-no-backdrop>
          <img alt="${caption} ${k}">
          <span class="variant__caption">${caption}</span>
        </div>`;
      }).join("");
      return `<div class="variants__row">${cards}</div>`;
    })
    .join("");

  const section = document.createElement("section");
  section.className = "slide slide--grid";
  section.innerHTML = `
    <div class="variants">
      <div class="variants__rows">${rowsMarkup}</div>
      <h2 class="side-title">${title}</h2>
    </div>`;
  return section;
}

function buildComponentSlide(component, number) {
  const folder = `assets/componente-${number}`;
  const hasPrompts = component.prompts.length > 0;

  const imageCells = IMAGE_CELLS.map((img) => {
    // Un componente puede cambiar la etiqueta de una casilla con "captions"
    const caption = component.captions?.[img.file] ?? img.caption;
    return `
      <div class="grid__cell grid__cell--${img.cell} grid__cell--image" data-src="${folder}/${img.file}">
        ${img.backdrop ? `<img class="grid__backdrop" alt="" aria-hidden="true">` : ""}
        <img alt="${caption} — ${component.title}">
        <span class="grid__caption">${caption}</span>
      </div>`;
  }).join("");

  const vizcomTag = hasPrompts ? "button" : "div";
  const vizcomCell = `
      <${vizcomTag} class="grid__cell grid__cell--4 grid__cell--image${hasPrompts ? " grid__cell--clickable" : ""}"
        data-src="${folder}/proceso-vizcom"${hasPrompts ? ` aria-haspopup="dialog"` : ""}>
        <img alt="Proceso Vizcom — ${component.title}">
        <span class="grid__caption">Proceso Vizcom</span>
        ${hasPrompts ? `<span class="grid__hint">Click para ver los prompts</span>` : ""}
      </${vizcomTag}>`;

  const popups = hasPrompts ? popupsMarkup(component.prompts) : "";

  const section = document.createElement("section");
  section.className = "slide slide--grid";
  // "finalWider" hace la casilla 2 un porcentaje más ancha: su columna mide f veces las
  // otras tres, con f / (3 + f) = (1 + p) / 4
  const p = component.finalWider ?? 0;
  const finalCol = p ? `style="--final-col: ${((3 * (1 + p)) / (3 - p)).toFixed(3)}fr"` : "";
  section.innerHTML = `
    <div class="grid" ${finalCol}>
      ${componentInfo(component, number, "grid__cell--1")}
      ${imageCells}
      ${vizcomCell}
      ${popups}
    </div>`;
  return section;
}

// Prueba las extensiones en orden hasta encontrar la imagen; si no existe, lo indica en la casilla
function loadCellImage(cell) {
  const base = cell.dataset.src;
  const imgs = cell.querySelectorAll("img");
  let i = 0;

  const tryNext = () => {
    if (i === IMAGE_EXTENSIONS.length) {
      imgs.forEach((img) => img.remove());
      // En las casillas opcionales no se avisa: se queda el número
      if ("optional" in cell.dataset) return;
      const missing = document.createElement("span");
      missing.className = "grid__missing";
      missing.textContent = `Falta la imagen: ${base}`;
      cell.prepend(missing);
      return;
    }
    const src = `${base}.${IMAGE_EXTENSIONS[i++]}`;
    const probe = new Image();
    probe.onload = () => {
      imgs.forEach((img) => (img.src = src));
      cell.querySelector(".gallery__number")?.remove();
      const wantsBackdrop = !("noBackdrop" in cell.dataset) && !cell.querySelector(".grid__backdrop");
      if (wantsBackdrop && isOpaque(probe)) addBackdrop(cell, src);
    };
    probe.onerror = tryNext;
    probe.src = src;
  };
  tryNext();
}

// ¿La imagen tiene fondo sólido? (se mira el píxel de la esquina superior izquierda)
function isOpaque(img) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.naturalWidth, img.naturalHeight);
  return ctx.getImageData(0, 0, 1, 1).data[3] === 255;
}

// Las imágenes con fondo sólido llevan detrás una copia desenfocada que rellena la casilla
function addBackdrop(cell, src) {
  const backdrop = document.createElement("img");
  backdrop.className = "grid__backdrop";
  backdrop.alt = "";
  backdrop.setAttribute("aria-hidden", "true");
  backdrop.src = src;
  cell.prepend(backdrop);
}

document
  .getElementById("components")
  .replaceWith(
    ...components.flatMap((c, i) => [
      c.solo ? buildSoloSlide(c, i + 1) : buildComponentSlide(c, i + 1),
      ...(c.gallery ? [buildGallerySlide(c, i + 1)] : []),
      ...(c.variants ? [buildVariantsSlide(c, i + 1)] : []),
      ...(c.extra ? [buildExtraSlide(c, i + 1)] : []),
    ])
  );
document.querySelectorAll(".grid__cell[data-src]").forEach(loadCellImage);

// ---------- Navegación ----------
const slides = document.querySelectorAll(".slide");
const progressBar = document.getElementById("progressBar");

let current = 0;

function goTo(index) {
  if (index < 0 || index >= slides.length) return;
  current = index;
  render();
}

function next() {
  goTo(current + 1);
}

function prev() {
  goTo(current - 1);
}

function render() {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === current);
    slide.classList.toggle("prev", i < current);
  });
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;

  // Guardar la diapositiva actual en la URL (#3)
  history.replaceState(null, "", `#${current + 1}`);
}

// Popups de los prompts de Vizcom (cada casilla abre los popups que tiene justo después)
let openPopupsEl = null;

function openPopups(cell) {
  // Solo puede haber un grupo de popups abierto: se cierra el anterior
  if (openPopupsEl) openPopupsEl.hidden = true;
  openPopupsEl = cell.nextElementSibling;
  openPopupsEl.hidden = false;
  openPopupsEl.focus();
}

function closePopups() {
  if (!openPopupsEl) return;
  openPopupsEl.hidden = true;
  openPopupsEl.previousElementSibling.focus();
  openPopupsEl = null;
}

document
  .querySelectorAll(".grid__cell--clickable")
  .forEach((cell) => cell.addEventListener("click", () => openPopups(cell)));
// Cualquier click sobre la casilla, incluidos los popups, los cierra
document
  .querySelectorAll(".popups")
  .forEach((popups) => popups.addEventListener("click", closePopups));

// Teclado
document.addEventListener("keydown", (e) => {
  // Con los popups abiertos solo funciona Escape (para cerrarlos)
  if (openPopupsEl) {
    if (e.key === "Escape") closePopups();
    return;
  }

  switch (e.key) {
    case "ArrowRight":
    case "PageDown":
    case " ":
      e.preventDefault();
      next();
      break;
    case "ArrowLeft":
    case "PageUp":
      e.preventDefault();
      prev();
      break;
    case "Home":
      goTo(0);
      break;
    case "End":
      goTo(slides.length - 1);
      break;
    case "f":
    case "F":
      toggleFullscreen();
      break;
  }
});

// Gestos táctiles (deslizar izquierda / derecha)
let touchStartX = 0;
document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].clientX;
});
document.addEventListener("touchend", (e) => {
  if (openPopupsEl) return;
  const diff = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diff) > 50) diff < 0 ? next() : prev();
});

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Iniciar en la diapositiva indicada en la URL, si existe
const fromHash = parseInt(location.hash.slice(1), 10);
current = fromHash >= 1 && fromHash <= slides.length ? fromHash - 1 : 0;
render();
