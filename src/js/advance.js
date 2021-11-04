import {iD,qS} from "../../docs/configurations/minimali.js"

const moveAlong = iD('move-along')
const buttomAdvance = qS('.move-along-type-youtube')
let newMoveAlong = 0
buttomAdvance.addEventListener('click', e => {
    newMoveAlong += 70
    moveAlong.style.transform = `translateX(-${newMoveAlong}%)`
})
