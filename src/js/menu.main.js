import {iD,qS,qSA} from "../../docs/configurations/minimali.js"

const asideMenu = iD('aside-menu')
const mainHeader = iD('main-header')
const showAside = iD('showAside')
const showMenu = iD('showMenu')
showAside.addEventListener('click', e => {
    asideMenu.classList.toggle("show")
})
asideMenu.addEventListener('mouseleave', e => {
    asideMenu.classList.remove("show")
   
})
showMenu.addEventListener('click', () => {
    mainHeader.classList.toggle("show")
})


// Scroll hidden menu
let backScroll = 0
 window.addEventListener('scroll', () => {
    let domScroll = document.documentElement.scrollTop;
    if(domScroll < backScroll) {
        mainHeader.classList.remove("show")
        console.log("MENU OCULTO")
    } else {
        mainHeader.classList.add("show")
    }
    backScroll = domScroll
 })