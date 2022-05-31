import { iD, qS, qSA } from "../../docs/configurations/minimali.js";

const URL = "./src/api/cursos.json";
const appCurso = iD("appCurso");
let counterCurso = 0;
const componentContenido = (data) => {
  data.reverse();
  for (const item of data) {
    if (counterCurso < 4) {
      if (item.type === "Tutorial") {
        typeTutorial(item);
      } else if (item.type === "Taller") {
        typeTaller(item);
      } else if (item.type === "Curso") {
        typeCurso(item);
      }
    }
    counterCurso++;
  }
};
const componentCurso = (data) => {
  data.reverse();
  for (const item of data) {
    if (item.type === "Curso") {
      typeCurso(item);
    }
  }
};
const componentTaller = (data) => {
  data.reverse();
  for (const item of data) {
    if (item.type === "Taller") {
      typeTaller(item);
    } 
  }
};
const componentTutorial = (data) => {
  data.reverse();
  for (const item of data) {
    if (item.type === "Tutorial") {
      typeTutorial(item);
    }
  }
};

const URLPATH = window.location.pathname;
if (URLPATH === "/almiror/cursos.html") {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => componentCurso(data));
} else if (URLPATH === "/index.html" || URLPATH === "/") {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => componentContenido(data));
} else if (URLPATH === "/taller.html") {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => componentTaller(data));
} else if (URLPATH === "/tutorial.html") {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => componentTutorial(data));
}

let hidennHREFCurso = `pointer-events: none;cursor: default;color:rgba(255,255,255,.3)`
const typeTutorial = (item) => {
    appCurso.innerHTML += `
    <div class="s-relative card card-course s-hidden s-radius-xy-2 s-border-card-1 bg-dark-body">
        <div class="card-img-course-container s-hidden clip-card-img">
            <img src="${item.poster}" alt="${item.title}">
        </div>
        <div class="s-pl-3 s-pr-3">
            <h2 class="t3 s-pt-2 s-mxy-0 color-light lg-row-text-1">
            ${item.title}
            </h2>
            <div class="smaller s-font-bold flex s-cross-center color-danger s-opacity-05">
                <div class="flex s-cross-center s-mr-3">
                    <svg class="card-svg-course s-fill-danger s-mr-2">
                        <use href="./src/assets/svg/icons.svg#view" />
                    </svg>
                    ${item.views}
                </div>
                <div class="flex s-cross-center">
                    <svg class="card-svg-course s-fill-danger s-mr-2">
                        <use href="./src/assets/svg/icons.svg#clock" />
                    </svg>
                    ${item.date}
                </div>
            </div>
            <p class="s-mxy-0 color-text-alt small s-font-light s-pt-1  lg-row-text-3">
            ${item.description}
            </p>
            <div
                class="card-course-type tutorial color-text s-radius-xy-1 smaller s-mb-3 s-mt-3 s-cross-center">
                <svg class="card-svg-course s-fill-text s-mr-2">
                    <use href="./src/assets/svg/icons.svg#tutorial" />
                </svg>
                Tutorial
            </div>
        </div>
        <div class="bg-dark flex s-main-justify s-pxy-2 s-cross-center">
            <div class="flex s-cross-center">
                <div class="s-hidden s-img-30 s-radius-xy-50 s-border-danger-2">
                    <img src="${item.teachers[0].poster}" alt="${item.teachers[0].name}" >
                </div>
                <span class="small color-text s-pl-2 s-radius-xy-2 s-row-text-1" title="${item.teachers[0].name}">
                ${item.teachers[0].name}
                </span>
            </div>
            <div class="flex s-cross-center">
                <a href="${item.url}" class="btn btn-transparent-light smaller" style="${item.stateurl==="false"? hidennHREFCurso:""}">
                ${item.stateurl==="false"? 'Grabando... 🎧':`Ver ${item.type}`}
                </a>
            </div>
        </div>
    </div>
    `;
};

const typeTaller = (item) => {
  appCurso.innerHTML += `
            <div class="s-relative card card-course s-hidden s-radius-xy-2 s-border-card-1 bg-dark-body">
                <div class="card-img-course-container s-hidden clip-card-img">
                    <img src="${item.poster}" alt="${item.title}">
                </div>
                <div class="s-pl-3 s-pr-3">
                    <h2 class="t3 s-pt-2 s-mxy-0 color-light lg-row-text-1">
                    ${item.title}
                    </h2>
                    <div class="smaller s-font-bold flex s-cross-center color-success s-opacity-05">
                        <div class="flex s-cross-center s-mr-3">
                            <svg class="card-svg-course s-fill-success s-mr-2">
                                <use href="./src/assets/svg/icons.svg#view" />
                            </svg>
                            ${item.views}
                        </div>
                        <div class="flex s-cross-center">
                            <svg class="card-svg-course s-fill-success s-mr-2">
                                <use href="./src/assets/svg/icons.svg#clock" />
                            </svg>
                            ${item.date}
                        </div>
                    </div>
                    <p class="s-mxy-0 color-text-alt small s-font-light s-pt-1  lg-row-text-3">
                    ${item.description}
                    </p>
                    <div
                        class="card-course-type taller color-text s-radius-xy-1 smaller s-mb-3 s-mt-3 s-cross-center">
                        <svg class="card-svg-course s-fill-text s-mr-2">
                            <use href="./src/assets/svg/icons.svg#taller-card" />
                        </svg>
                        Taller
                    </div>
                </div>
                <div class="bg-dark flex s-main-justify s-pxy-2 s-cross-center">
                    <div class="flex s-cross-center">
                        <div class="s-hidden s-img-30 s-radius-xy-50 s-border-success-2">
                            <img src="${item.teachers[0].poster}" alt="${item.teachers[0].name}">
                        </div>
                        <span class="small color-text s-pl-2 s-radius-xy-2 s-row-text-1" title="${item.teachers[0].name}">
                        ${item.teachers[0].name}
                        </span>
                    </div>
                    <div class="flex s-cross-center">
                        <a href="${item.url}" class="btn btn-transparent-light smaller"  style="${item.stateurl==="false"? hidennHREFCurso:""}">
                        ${item.stateurl==="false"? 'Grabando... 🎧':`Ver ${item.type}`}
                        </a>
                    </div>
                </div>
            </div>
            `;
};

const typeCurso = (item) => {
  appCurso.innerHTML += `
            <div class="s-relative card card-course s-hidden s-radius-xy-2 s-border-card-1 bg-dark-body">
                <div class="card-img-course-container s-hidden clip-card-img">
                    <img src="${item.poster}" alt="${item.title}">
                </div>
                <div class="s-pl-3 s-pr-3">
                    <h2 class="t3 s-pt-2 s-mxy-0 color-light lg-row-text-1">
                    ${item.title}
                    </h2>
                    <div class="smaller s-font-bold flex s-cross-center color-secondary s-opacity-05">
                        <div class="flex s-cross-center s-mr-3">
                            <svg class="card-svg-course s-fill-secondary s-mr-2">
                                <use href="./src/assets/svg/icons.svg#view" />
                            </svg>
                            ${item.views}
                        </div>
                        <div class="flex s-cross-center">
                            <svg class="card-svg-course s-fill-secondary s-mr-2">
                                <use href="./src/assets/svg/icons.svg#clock" />
                            </svg>
                            ${item.date}
                        </div>
                    </div>
                    <p class="s-mxy-0 color-text-alt small s-font-light s-pt-1  lg-row-text-3">
                    ${item.description}
                    </p>
                    <div
                        class="card-course-type course color-text s-radius-xy-1 smaller s-mb-3 s-mt-3 s-cross-center">
                        <svg class="card-svg-course s-fill-text s-mr-2">
                            <use href="./src/assets/svg/icons.svg#graduacion" />
                        </svg>
                        Curso
                    </div>
                </div>
                <div class="bg-dark flex s-main-justify s-pxy-2 s-cross-center">
                    <div class="flex s-cross-center">
                        <div class="s-hidden s-img-30 s-radius-xy-50 s-border-primary-2">
                            <img src="${item.teachers[0].poster}" alt="${item.teachers[0].name}">
                        </div>
                        <span class="small color-text s-pl-2 s-radius-xy-2 s-row-text-1" title="${item.teachers[0].name}">
                        ${item.teachers[0].name}
                        </span>
                    </div>
                    <div class="flex s-cross-center">
                        <a href="${item.url}" class="btn btn-transparent-light smaller"  style="${item.stateurl==="false"? hidennHREFCurso:""}">
                        ${item.stateurl==="false"? 'Grabando... 🎧':`Ver ${item.type}`}
                        </a>
                    </div>
                </div>
            </div>
            `;
};
