import { iD, qS, qSA } from "../../docs/configurations/minimali.js";

const asidePublicPostCourse = qS('.aside-stiky-img')
const asidePublicTextCourse = qS('.course-aside-stiky')
const URLPOSTCourses = "./src/api/cursos.json";
fetch(URLPOSTCourses)
.then(response => response.json())
.then(data => {
    let itemTotal = 0
    data.map(item => {
        if(parseInt(item.id) <= 1999) {
            itemTotal++
            let itemRandomActual = randomDataResponsePost(itemTotal) 
            if(parseInt(item.id) === itemRandomActual ) {
                asidePublicPostCourse.children[0].src = `${item.poster}`
                asidePublicTextCourse.children[0].children[0].children[0].children[1].children[0].innerText = item.title
                asidePublicTextCourse.children[0].children[0].children[0].children[1].children[1].innerText = item.type
                asidePublicTextCourse.children[0].children[0].children[1].children[0].setAttribute('href', item.url)
                if(item.stateurl === "false"){
                    asidePublicTextCourse.children[0].children[0].children[1].children[0].style.pointerEvents = "none"
                    asidePublicTextCourse.children[0].children[0].children[1].children[0].style.color = "rgba(255,255,255,.5)"
                    asidePublicTextCourse.children[0].children[0].children[1].children[0].style.borderColor = "rgba(255,255,255,.07)"
                    asidePublicTextCourse.children[0].children[0].children[1].children[0].style.backgroundColor = "rgba(255,255,255,.1)"
                    asidePublicTextCourse.children[0].children[0].children[1].children[0].innerText = "Grabando.. 🎧"
                }
            }
        }
    }) 
    
})

const randomDataResponsePost = (itemTotal) => {
    return Math.floor((Math.random() * (itemTotal - 1 + 1 )) + 1); 
}