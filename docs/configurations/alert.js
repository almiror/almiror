const alertItemInner = (textTitle, textDescription, textBtn, typeBtnColor, titleColor) => {
    return  `
    <div class="s-border-1 s-pxy-3 s-radius-xy-2 s-text-center alert-container-item">
        <h5 class="${titleColor} t3 s-mb-4 s-mt-1">
        ${textTitle}
        </h5>
        <p class="color-text-alt small s-mb-5">
            ${textDescription}
        </p>
        <div>
            <button class="btn ${typeBtnColor}">
            ${textBtn}
            </button>
        </div>
    </div>
    `
}

let containerError = document.createElement("DIV")
containerError.classList.add('alert-course','flex','s-main-center','s-cross-center')
let btnCloseModal = containerError.children[0].children[2].children[0]

export default {containerError, alertItemInner, btnCloseModal}

// containerError.innerHTML = alertItemInner()
// document.body.appendChild(containerError)
// btnCloseModal.addEventListener('click', e => {
//     document.body.removeChild(document.querySelector('.alert-course'))
// })


