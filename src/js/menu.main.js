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
        if(qS('.course-aside-stiky')){
        qS('.course-aside-stiky').classList.remove('show')
        }
    } else {
        mainHeader.classList.add("show")
        if(qS('.course-aside-stiky')) {
            qS('.course-aside-stiky').classList.add('show')
        }
    }
    backScroll = domScroll
})
 if(iD('btnHelpCuestion')) {
    iD('btnHelpCuestion').addEventListener('click', () => {
        window.open('https://wa.link/1tze1j', '_blank')
        // window.location.href = "https://wa.link/1tze1j"
    })
 }

 