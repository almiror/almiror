import { iD, qS, qSA } from "../../docs/configurations/minimali.js";

let containerLoading = document.createElement("DIV");
containerLoading.classList.add(
  "loading-pages",
  "flex",
  "s-cross-center",
  "s-main-center"
);
containerLoading.id = "loading-pages";

let subContainerLoading = document.createElement("DIV");
subContainerLoading.classList.add(
  "flex",
  "s-cross-center",
  "s-main-center",
  "s-direction-column"
);

let subSubContainerLoading = document.createElement("DIV");
subSubContainerLoading.classList.add("s-mt-4");

let svgLogoAnimationInset = ` 
        <?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" class="svg-container-logo-loading" width="25.7501mm" height="22.168mm" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
        viewBox="0 0 307.72 264.92"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
        <clipPath id="id0">
        <path  d="M22.36 178.26l49.18 -29.98c7.26,-3.52 14.94,-3.2 21.38,-0l60.03 35.15 59.8 -35.22c6.79,-3.18 13.45,-3.01 19.35,0.08l52.56 30.15c4.67,2.82 4.85,9.06 0.03,12.23l-119.82 70.44c-8.81,4.9 -12.59,5.2 -21.93,0.21l-120.34 -71.67c-3.53,-1.85 -4.62,-8.14 -0.24,-11.39z"/>
        </clipPath>
        <clipPath id="id1">
        <path d="M3.28 37.22l56.32 -34.33c8.31,-4.03 17.1,-3.67 24.48,-0l68.74 40.25 68.47 -40.33c7.78,-3.64 15.4,-3.45 22.15,0.09l60.19 34.52c5.35,3.23 5.55,10.38 0.03,14l-137.19 80.66c-10.09,5.61 -14.42,5.95 -25.12,0.24l-137.79 -82.06c-4.04,-2.11 -5.29,-9.32 -0.27,-13.04z"/>
        </clipPath>
        </defs>
        <g id="Capa_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"/>
        <g id="_1266185189568">
        <path fill="#294B6B"  class="phat-logo-loadgin-2" d="M22.36 178.26l49.18 -29.98c7.26,-3.52 14.94,-3.2 21.38,-0l60.03 35.15 59.8 -35.22c6.79,-3.18 13.45,-3.01 19.35,0.08l52.56 30.15c4.67,2.82 4.85,9.06 0.03,12.23l-119.82 70.44c-8.81,4.9 -12.59,5.2 -21.93,0.21l-120.34 -71.67c-3.53,-1.85 -4.62,-8.14 -0.24,-11.39z"/>
        <g clip-path="url(#id0)">
        <g>
        <polygon id="1" class="fill-poligon-loagind-logo2" fill="#1F3952" points="83.37,225.82 152.94,183.42 221.01,228.12 295.32,277.79 155.34,293.83 70.88,256.83 "/>
        </g>
        </g>
        <path fill="none" d="M22.36 178.26l49.18 -29.98c7.26,-3.52 14.94,-3.2 21.38,-0l60.03 35.15 59.8 -35.22c6.79,-3.18 13.45,-3.01 19.35,0.08l52.56 30.15c4.67,2.82 4.85,9.06 0.03,12.23l-119.82 70.44c-8.81,4.9 -12.59,5.2 -21.93,0.21l-120.34 -71.67c-3.53,-1.85 -4.62,-8.14 -0.24,-11.39z"/>
        <path class="phat-logo-loadgin-1" d="M3.28 37.22l56.32 -34.33c8.31,-4.03 17.1,-3.67 24.48,-0l68.74 40.25 68.47 -40.33c7.78,-3.64 15.4,-3.45 22.15,0.09l60.19 34.52c5.35,3.23 5.55,10.38 0.03,14l-137.19 80.66c-10.09,5.61 -14.42,5.95 -25.12,0.24l-137.79 -82.06c-4.04,-2.11 -5.29,-9.32 -0.27,-13.04z"/>
        <g clip-path="url(#id1)">
        <g>
        <polygon id="1" class="fill-poligon-loagind-logo" fill="#0C5DA8" points="73.15,91.68 152.81,43.14 230.75,94.32 409.89,159.28 151.7,208.18 -122.93,183.13 "/>
        </g>
        </g>
        <path fill="none" d="M3.28 37.22l56.32 -34.33c8.31,-4.03 17.1,-3.67 24.48,-0l68.74 40.25 68.47 -40.33c7.78,-3.64 15.4,-3.45 22.15,0.09l60.19 34.52c5.35,3.23 5.55,10.38 0.03,14l-137.19 80.66c-10.09,5.61 -14.42,5.95 -25.12,0.24l-137.79 -82.06c-4.04,-2.11 -5.29,-9.32 -0.27,-13.04z"/>
        </g>
        </g>
        </svg>
`;

//API DE FRASES
const apiFrases = [
  {
    title:
      "La funci??n de un buen software es hacer que lo complejo aparente ser simple",
    autor: "-- Grady Booch",
  },
  {
    title: "Primero resuelve el problema. Entonces, escribe el c??digo",
    autor: "-- John Johnson",
  },
  {
    title: "Iterar es humano, 'recursivar' es divino",
    autor: "-- L. Peter Deutsch",
  },
  {
    title:
      "Lo mejor de los booleanos es que si te equivocas est??s a un s??lo bit de la soluci??n correcta",
    autor: "-- An??nimo",
  },
  {
    title: "Java es, en muchos sentidos, C++-",
    autor: "-- Michael Feldman",
  },
  {
    title: "El buen c??digo es su mejor documentaci??n",
    autor: "-- Steve McConnell",
  },
  {
    title: "La creatividad es la inteligencia divirti??ndose",
    autor: "Albert Einstein",
  },
];

let frases = "";
let autores = "";
let numberRandom = Math.floor(Math.random() * (apiFrases.length - 0)) + 0;
apiFrases.map((item, index) => {
  if (index == numberRandom) {
    frases = apiFrases[index].title;
    autores = apiFrases[index].autor;
  }
});
let frasesCelebresAnimationLoading = ` 
        <p class="s-mxy-0 s-pr-2 s-pl-2 normal color-text-alt max-width-parrafo-loading s-text-center">
        ${frases}
        <span class="color-yellow-300 s-display-block smaller s-pt-3">${autores}</span>
        </p>
`;
containerLoading.appendChild(subContainerLoading);
subContainerLoading.innerHTML = svgLogoAnimationInset;

document.body.appendChild(containerLoading);
const timeLoadingFrases = setTimeout(() => {
  subContainerLoading.appendChild(subSubContainerLoading);
  subSubContainerLoading.innerHTML = frasesCelebresAnimationLoading;
  clearTimeout(timeLoadingFrases);
}, 5500);


window.onload = () => {
  if (document.readyState == "complete") {
    document.body.removeChild(qS(".loading-pages"));
  }
  const activeFirstItem = qSA(".temary-item");
  if (activeFirstItem) {
    for (let i = 0; i < activeFirstItem.length; i++) {
      if (i === 0) {
        activeFirstItem[i].classList.add("active");
        if (activeFirstItem[i].classList.contains("active"))
          activeFirstItem[
            i
          ].children[0].children[0].children[0].children[0].setAttribute(
            "href",
            "../src/assets/svg/icons.svg#eye-open"
          );
      }
    }
  }
};
