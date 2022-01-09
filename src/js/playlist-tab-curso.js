import {iD, qS,qSA} from "../../docs/configurations/minimali.js"

const getContenItemPlaylist = qS('.container-playlist-items')
getContenItemPlaylist.addEventListener('click', e => {
    if(e.target.classList.contains('temary-title')) {
        e.target.parentNode.classList.toggle('active')
        if(e.target.parentNode.classList.contains('active')){
            e.target.parentNode.children[0].children[0].children[0].children[0].setAttribute('href','../src/assets/svg/icons.svg#eye-open')
        } else {
            e.target.parentNode.children[0].children[0].children[0].children[0].setAttribute('href','../src/assets/svg/icons.svg#eye-closed')
        }
    }
})

// Api Temario del curso
let URLTEMARY = "../src/api/temary.json"
fetch(URLTEMARY)
.then(response => response.json())
.then(data => {
    abstractionData(data)
})
let counterItemVideo = 1
let counterSubItemVideo = 1

let containerItemTemarys = `
<div class="temary-item s-mb-3 s-hidden">
    <div
        class="color-text normal temary-title s-pxy-2 s-radius-tr-1 s-radius-tl-1 flex s-cross-center s-main-justify">
        
        <div class="flex s-cross-center">
            <svg class="s-fill-text s-img-20">
                <use href="../src/assets/svg/icons.svg#eye-closed" />
            </svg>
        </div>
    </div>
    <div class="temary-content small">
        <ul class="subitemstemaries">
            
        </ul>
    </div>
</div>
`
const abstractionData= (data) => {
    data.map(item => {
        if(item.id === iD('Key000Vi01').innerText){ 
            iD('title').innerText = item.title
            document.title = item.title
            for (let i = 0; i < item.module.length; i++) {
                getContenItemPlaylist.innerHTML += containerItemTemarys
                let listItemTitle = qSA('.temary-title')
                let subitemsTemaries = qSA('.subitemstemaries')
                listItemTitle[i].insertAdjacentText("afterbegin", `${counterItemVideo}: ${item.module[i].title}`)
                for (let j = 0; j < item.module[i].temary.length; j++) {
                    subitemsTemaries[i].innerHTML += `
                    <li class="temary-subitem s-pxy-2 color-text-alt" urlVideoPlayer="${item.module[i].temary[j].url}" descriptionVideo="${item.module[i].temary[j].description}" date-publication="Publicado: ${item.module[i].temary[j].datePublication}">
                    ${counterItemVideo}.${counterSubItemVideo}: ${item.module[i].temary[j].title}
                    </li>                    
                    `
                    counterSubItemVideo++
                }
                counterItemVideo ++
                counterSubItemVideo = 1
            }
        }
    })
}

window.onload = () =>{
    const activeFirstItem = qSA('.temary-item')
    for (let i = 0; i < activeFirstItem.length; i++) {
        if(i === 0) {
            activeFirstItem[i].classList.add('active')
            if(activeFirstItem[i].classList.contains('active')) activeFirstItem[i].children[0].children[0].children[0].children[0].setAttribute('href','../src/assets/svg/icons.svg#eye-open')          
        }

        
    }
}
const dropDownTitleVideo = iD('dropDownDescription')
const dropDownDescriptionVideo = qS('.container-controls-videodescription')
dropDownTitleVideo.addEventListener('click', e => {
    dropDownDescriptionVideo.classList.toggle('active')
    if(dropDownDescriptionVideo.classList.contains('active')) {
        dropDownTitleVideo.children[0].style.transform = "rotate(-180deg)"
    } else {        
        dropDownTitleVideo.children[0].style.transform = "rotate(0)"
    }
})