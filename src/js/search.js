import { iD,qS } from "../../docs/configurations/minimali.js";
const searchInput = iD('seacrh-input')
searchInput.addEventListener('keyup', () =>{
    if(searchInput.value.length <= 0){
        searchInput.parentNode.children[1].classList.remove('active')
        iD('append-search-item').innerHTML = ""
    } else {
        searchInput.parentNode.children[1].classList.add('active')        
        fetchLiveSearch(searchInput.value.toUpperCase())
    }
})
searchInput.addEventListener('search', () =>{
    searchInput.parentNode.children[1].classList.remove('active')
    iD('append-search-item').innerHTML = ""
})


const fetchLiveSearch = (input) => {
    fetch("./src/assets/json/api-search.json")
    .then(data => data.json())
    .then(response => {
        response.map(item => {
            if(item.title.toUpperCase().indexOf(input) > -1){
                let itemAppend = `
                    <li class="content-search-item" style="display:block">
                        <a href="${item.url}" class="small content-search-link">${item.title}</a>
                    </li>
                `
                iD('append-search-item').innerHTML = itemAppend
            } 
        })
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