import { iD,qS } from "../../docs/configurations/minimali.js";
const searchInput = iD('seacrh-input')
const resultSearch = iD('append-search-item')
searchInput.addEventListener('keyup', () =>{
    if(searchInput.value.length <= 0){
        searchInput.parentNode.children[1].classList.remove('active')
        resultSearch.innerHTML = ""
    } else {
        searchInput.parentNode.children[1].classList.add('active')        
        fetchLiveSearch(searchInput.value.toUpperCase())
    }
})
searchInput.addEventListener('search', () =>{
    searchInput.parentNode.children[1].classList.remove('active')
    resultSearch.innerHTML = ""
})


let itemAppend
const fetchLiveSearch = (input) => {
    resultSearch.innerHTML = ''
    fetch("./src/assets/json/api-search.json")
    .then(data => data.json())
    .then(response => {
        for (let item of response) {
            let nameCurso = item.title.toUpperCase()
            if(nameCurso.indexOf(input) !== -1){
                itemAppend = `
                    <li class="content-search-item" style="display:block">
                        <a href="${item.url}" class="small content-search-link">${item.title}</a>
                    </li>
                `
                resultSearch.innerHTML += itemAppend
            } 
        }
        if(resultSearch.innerHTML === ""){
            itemAppend = `
                <li class="content-search-item" style="display:block">
                    <span class="small content-search-link">
                        Busqueda no encontrada
                    </span>
                </li>
            `
            resultSearch.innerHTML = itemAppend
        }
    })
}


let contentSearch = qS('.content-search')
contentSearch.addEventListener('click', ()=> {
    contentSearch.classList.toggle('active')
})

const openSearch = iD('openSearch')
const containerSearch = qS('.container-search')
openSearch.addEventListener('click', () => {
    containerSearch.classList.toggle('active')
})