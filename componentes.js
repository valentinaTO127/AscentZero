// Contenido de las diapositivas de componentes: una diapositiva por elemento.
//
// Las imágenes del componente N van en assets/componente-N/ con estos nombres
// (la extensión puede ser .png, .webp, .jpg o .jpeg):
//   concepto-3d     → casilla "Concepto en 3D"
//   shading         → casilla "Shading"
//   pixel-art       → casilla "Versión Pixel Art-Render Final" (mejor con fondo transparente)
//   proceso-vizcom  → casilla "Proceso Vizcom"
//
// "description" admite HTML (<strong>, <em>...). Si "prompts" está vacío,
// la casilla "Proceso Vizcom" no abre popups.
//
// "captions" (opcional) cambia la etiqueta de una casilla, por nombre de archivo:
//   captions: { "concepto-3d": "Arte Conceptual", shading: "Mejoras usando IA" }
//
// "finalWider" (opcional) hace más ancha la casilla "Versión Pixel Art-Render Final":
//   finalWider: 0.1 → un 10% más ancha (las otras columnas se estrechan un poco)
//
// "extra" (opcional) añade una diapositiva con el mismo texto del componente, una frase
// grande y una sola imagen: assets/componente-N/<image>. Va al final de las diapositivas
// del componente (después de "gallery" y "variants" si los tiene).
//
// "solo" (opcional) cambia la diapositiva normal de 5 casillas por una sola diapositiva:
// el texto del componente, una frase, una imagen ancha (assets/componente-N/<image>)
// y un título en vertical a la derecha. La frase ("note") es opcional. Con
// "cards: { count, columns }" muestra una cuadrícula de tarjetas (<image>-1, <image>-2...)
// en vez de una sola imagen.
//
// "gallery" (opcional) añade después una diapositiva de 9 casillas, numeradas
// 1, 3, 6, 7, 8, 9, 10, 11 y 12 como en el boceto. La casilla K muestra
// assets/componente-N/galeria-K (.png, .webp...) o, si no existe, su número.
// Cada casilla puede llevar { caption, prompts } como las de la diapositiva normal,
// o { title } para mostrar solo un título en vertical (sin imagen ni caja).
//
// "variants" (opcional) añade después una diapositiva de tarjetas con un título en
// vertical a la derecha. "rows" dice cuántas tarjetas hay en cada fila; las imágenes son
// assets/componente-N/variante-1, variante-2... en orden de lectura.

// Prompts que se repiten en la galería de letreros
const PROMPT_PIXEL_ART =
  "Quisiera que me hicieras esta imagen en un pixel art 64×64 pixeles y que mantenga " +
  "el estilo visual original";
const PROMPT_PIXEL_ART_FRONTAL = `${PROMPT_PIXEL_ART}. Tambien quiero que este totalmente frontal`;

const components = [
  {
    title: "Componente recolectable",
    purpose: "Objeto recolectable encontrado en el escenario.",
    description:
      "<strong><em>Asset recolectable</em></strong> que permite a la protagonista " +
      "encontrarlo por el escenario y servirá para puzzles puesto como mecanismos a los " +
      "que les faltan partes y se deberán buscar y posteriormente colocar.",
    prompts: [
      "I want to make this a pixel art 64×64 without background",
      "I want it to have some dirt on it, like something that has been abandoned for " +
        "quite some time, the cables should be a little bit damage along with a few " +
        "really tiny sparks that are coming out of them",
    ],
  },
  {
    title: "Lámpara usable",
    purpose:
      "Objeto que estará siempre en el inventario y se podrá usar en cualquier momento.",
    description:
      "<strong><em>Asset usable</em></strong> que permite a la protagonista sacarlo de su " +
      "inventario para usarlo cuando quiera.",
    prompts: [
      "Make it a pixel art of 64×64 without background",
      "I want it to be rusty, like something that has been abandoned for quite some time, " +
        "maintain de colors and the illumination of the light bulb, the rusty part are in " +
        "just certain parts of the object",
    ],
  },
  {
    title: "Caja interactuable",
    purpose: "Interacción con el entorno y sigilo.",
    description:
      "<strong><em>Asset interactuable</em></strong> que permite a la protagonista " +
      "esconderse y desplazar la caja dentro del entorno. Contribuye a las mecánicas de " +
      "sigilo y a la resolución de situaciones durante la exploración.",
    prompts: [
      "Quisiera que me hicieras esta imagen en un pixel art 64×64 pixeles y que mantenga " +
        "el estilo visual original, y me gustaria que la madera fuera un poco más oscura",
      "podrias mantener el estilo visual de este pixel art 64×64 pero haz la madera un " +
        "color ligeramente mas oscuro",
    ],
  },
  {
    title: "Puerta interactuable",
    purpose: "Acceso y transición entre zonas.",
    description:
      "<strong><em>Elemento interactuable</em></strong> que permite a la protagonista " +
      "acceder a otras áreas del juego. Facilita la exploración y conecta diferentes " +
      "espacios del entorno, favoreciendo la progresión del jugador.",
    prompts: [
      "Quisiera que me hicieras esta imagen en un pixel art 64×64 pixeles y que mantenga " +
        "el estilo visual original, en la parte de abajo la puerta tiene tablas, recuerda " +
        "el pixel art 64×64",
    ],
    extra: {
      image: "torii",
      note: "Este asset se desarrolló desde un inicio en pixel art con base a referencias",
    },
  },
  {
    title: "Obstáculo",
    purpose: "Servir como obstáculo o restricción a zonas no accesibles del juego.",
    description:
      "<strong><em>Obstáculo</em></strong> que obligará a la protagonista a saltar sobre él " +
      "o ser un muro inaccesible para restringir el acceso a zonas del juego.",
    prompts: [
      "Quisiera que me hicieras esta imagen en un pixel art 64×64 pixeles y que mantenga " +
        "el estilo visual original",
    ],
  },
  {
    title: "Letreros ambientales",
    purpose: "Contexto visual y construcción del mundo.",
    description:
      "<strong><em>Assets decorativos</em></strong> que aportan información visual sobre el " +
      "lugar en el que se desarrolla el juego.",
    prompts: [
      "Quisiera que me hicieras esta imagen en un pixel art 64×64 pixeles y que mantenga " +
        "el estilo visual original",
    ],
    gallery: {
      1: { caption: "Proceso Vizcom", prompts: [PROMPT_PIXEL_ART] },
      3: { caption: "Proceso Vizcom", prompts: [PROMPT_PIXEL_ART] },
      6: { caption: "Proceso Vizcom", prompts: [PROMPT_PIXEL_ART] },
      7: { caption: "Proceso Vizcom", prompts: [PROMPT_PIXEL_ART] },
      8: { caption: "Proceso Vizcom", prompts: [PROMPT_PIXEL_ART_FRONTAL] },
      9: { caption: "Proceso Vizcom", prompts: [`${PROMPT_PIXEL_ART_FRONTAL}.`] },
      10: { caption: "Proceso Vizcom", prompts: [PROMPT_PIXEL_ART_FRONTAL] },
      11: { caption: "Proceso Vizcom", prompts: [PROMPT_PIXEL_ART_FRONTAL] },
      12: { title: "Asset - Letrero variantes" },
    },
    variants: {
      title: "Asset - Letrero variantes",
      caption: "Versión Pixel Art-Render Final",
      rows: [5, 3],
    },
    extra: {
      image: "letrero-pixel-art",
      note: "Este asset se desarrolló desde un inicio en pixel art con base a referencias",
    },
  },
  {
    title: "Lámpara ambiental",
    purpose: "Contexto visual y construcción del mundo.",
    description:
      "<strong><em>Asset decorativo</em></strong> que aportan información visual sobre el " +
      "lugar en el que se desarrolla el juego.",
    prompts: [
      "Make it a pixel art of 64×64, it has no bloom and is not emitting any light",
      "Eliminate de background, and make the elements emit just a little bit of light",
    ],
  },
  {
    title: "Lata recolectable y usable",
    purpose: "Objeto que se podrá recolectar en el escenario.",
    description:
      "<strong><em>Asset usable</em></strong> que se podrá guardar en el inventario y así " +
      "mismo usar cuando se desee.",
    prompts: [
      "Make it a pixel art of 64×64 in a frontal position not in a 3D view",
      "This is a can of food, make it slightly open but with no food inside of it, and is " +
        "a little bit dirty like something that has been in the trash can after being used",
      "Keep in mind that is a 64×64 pixel art, it look like a 124×124",
    ],
  },
  {
    title: "Botella recolectable y usable",
    purpose: "Objeto que se podrá recolectar en el escenario.",
    description:
      "<strong><em>Asset usable</em></strong> que se podrá guardar en el inventario y así " +
      "mismo usar cuando se desee.",
    prompts: [
      "I want to make this a pixel art 64×64 without background, the bottle has some tiny " +
        "cracks on it",
      "The bottle has a tiny broken part in the left bottom side",
      "It has more missing part in random parts of the bottle, they are really small",
      "The bottle has a tiny broken part in the left bottom side",
    ],
  },
  {
    title: "Lata recolectable y usable",
    purpose: "Objeto que se podrá recolectar en el escenario.",
    description:
      "<strong><em>Asset usable</em></strong> que se podrá guardar en el inventario y así " +
      "mismo usar cuando se desee.",
    prompts: [
      "Make it a pixel art of 64×64 in a frontal position not in a 3D view",
      "Do not add any name to the object, eliminate those squares and make it look like " +
        "something that has been abandoned for quite some time, then is kinda dirty but " +
        "just a little, maintain de colors",
    ],
  },
  {
    title: "Estamina",
    purpose: "Mostrar en pantalla la estamina de la protagonista cuando esta en uso.",
    description:
      "<strong><em>Asset visible</em></strong> que aparecerá solo cuando el personaje " +
      "comience a correr y así ver su barra de estamina.",
    prompts: [],
    solo: {
      image: "estamina",
      note: "Este asset se desarrolló desde un inicio en pixel art con base a referencias",
      sideTitle: "Asset - Estamina",
    },
  },
  {
    title: "Estantería de biblioteca",
    purpose: "Contexto visual y construcción del mundo.",
    description:
      "<strong><em>Assets decorativos</em></strong> que aportan información visual sobre el " +
      "lugar en el que se desarrolla el juego.",
    captions: { "concepto-3d": "Arte Conceptual", shading: "Mejoras usando IA" },
    finalWider: 0.1,
    prompts: ["Make it pixel art 64×64 and make the colors a darker green"],
  },
  {
    title: "Triceratops",
    purpose: "Contexto visual y construcción del mundo.",
    description:
      "<strong><em>Assets decorativos</em></strong> que aportan información visual sobre el " +
      "lugar en el que se desarrolla el juego.",
    prompts: [],
    solo: {
      image: "triceratops",
      cards: { count: 6, columns: 3 },
      sideTitle: "Asset - Triceratops",
    },
  },
];
