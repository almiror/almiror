import { iD, qS, qSA} from "../../docs/configurations/minimali.js";

const URL = "./src/api/popular-topics.json";
const appPouplarTopics = iD("move-along");
const componentPopularTopics = (data) => {
  for (const item of data) {
    containerPopularTopics(item);
  }
};

const URLPATH = window.location.pathname;
if (URLPATH === "/almiror/cursos.html") {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => componentPopularTopics(data));
} else if (URLPATH === "/almiror/taller.html") {
    fetch(URL)
    .then((response) => response.json())
    .then((data) => componentPopularTopics(data));
} else if (URLPATH === "/almiror/tutorial.html") {
    fetch(URL)
    .then((response) => response.json())
    .then((data) => componentPopularTopics(data));
}

const containerPopularTopics = item => {
    appPouplarTopics.innerHTML += `
        <div class="s-relative s-pxy-2 card s-hidden s-radius-xy-1 s-border-1 grid s-grid-12 s-cross-center bg-dark-body min-w-card-curso item-popular-cants">
            <div class="s-radius-xy-50 s-img-40 s-border-3 s-hidden s-mr-2 s-cols-4">
                <img src="${item.poster}" alt="${item.title}">
            </div>
            <div class="s-col-star-5 s-cols-12">
                <h2 class="s-mxy-0 color-text normal s-row-text-1">
                ${item.title}
                </h2>
                <p class="s-mxy-0 color-text-alt smaller s-row-text-1">
                ${item.description} <strong>${item.nivel}</strong>
                </p>
            </div>
        </div>
            `
}


// OBSERVER PARA TEMAS POPULARES Y OCULTAR EL BOTON DE AVANCE 

 window.onload = ()  => {
     const itemToppicPopularChildrens = qSA('.item-popular-cants')
    let countItemTopicCourse = 0
    itemToppicPopularChildrens.forEach(item => {
        countItemTopicCourse ++
        if (itemToppicPopularChildrens.length - 1 >= countItemTopicCourse ) item.classList.remove('item-popular-cants')
    }) 

    const observerTemaryPopular = new IntersectionObserver( (entradas, observador) => {
        entradas.forEach(entrada => {
            if(entrada.isIntersecting) {
                appPouplarTopics.parentNode.children[1].style.visibility = "hidden"
            } else  {
                appPouplarTopics.parentNode.children[1].style.visibility = "visible"
            }
        })
    }, {
        threshold: 1,
        rootMargin: '0px 0px 0px 40%'
    })
    const topicObserver = qSA('.item-popular-cants')
    topicObserver.forEach(headers => {
        observerTemaryPopular.observe(headers)
    });
 }