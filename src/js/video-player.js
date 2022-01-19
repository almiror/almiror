let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;

//VARIABLE PARA LA URL DE LOS VIDEOS
let getURLVideo;
const getContenItemPlaylist = document.querySelector(
  ".container-playlist-items"
);
getContenItemPlaylist.addEventListener("click", (e) => {
  const temarySubItemActive = document.querySelectorAll('.temary-subitem')
  if (
    e.target.tagName === "LI" &&
    e.target.classList.contains("temary-subitem") && 
    e.target.getAttribute('urlvideoplayer') != ""
  ) {
    //CONTEN DOWNLOAD PROYECT
    let urlDownloadProyect = ` 
    <div class="smaller color-text-alt flex s-cross-center">
    <svg class="s-img-15 s-fill-text-alt s-mr-2">
        <use href="../src/assets/svg/icons.svg#github-logo" /> 
    </svg>
    Descargar Proyecto
    </div>
    <div class="smaller s-pt-2">
        <a href="${e.target.getAttribute('downloadProyect')}" class="color-link" target="_blank">
            ${e.target.getAttribute('downloadProyect')}
        </a>
    </div>
    `


    //OBTENEMOS EL ID DEL VIDEO PARA LA REPRODUCCIÓN
    getURLVideo = e.target.getAttribute("urlVideoPlayer");

    document.querySelector(".description-video-actual").innerText =
      e.target.getAttribute("descriptionVideo");
    document.querySelector(".title-video-actual").innerText =
      e.target.innerText;
      document.title = e.target.innerText
    document.querySelector('.date-publication-video').innerText = e.target.getAttribute("date-publication")
    for (let item = 0; item < temarySubItemActive.length; item++) {
      temarySubItemActive[item].classList.remove('active')
      e.target.classList.add('active')
      
    }
    const nodoDocument = document.querySelector(".content-video-player");
    if (document.getElementById("player")) {
      nodoDocument.removeChild(document.getElementById("player"));
    }
    const createContent = document.createElement("DIV");
    createContent.id = "player";
    nodoDocument.appendChild(createContent);
    document.getElementById('urlDownloadProyect').innerHTML = urlDownloadProyect
    document.getElementById('urlDownloadProyect').classList.add('bg-rgb-light-50','s-radius-xy-1','s-pxy-3')
    nodoDocument.setAttribute('data-class', 'before');
    function onYouTubeIframeAPIReady() {
      player = new YT.Player("player", {
        videoId: getURLVideo,
        playerVars: {
          controls: 1,
          fs: 0,
          end: 100,
          cc_load_policy: 1,
          modestbranding: 1,
          iv_load_policy: 3,
          showinfo: 1,
          fs: 1
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    }

    onYouTubeIframeAPIReady();
  } else {

    if(e.target.tagName === "LI") {
      let error = `
      <div class="s-border-1 s-pxy-3 s-radius-xy-2 s-text-center alert-container-item">
          <h5 class="color-danger t3 s-mb-4 s-mt-1">
              Upss algo salio mal
          </h5>
          <p class="color-text-alt small s-mb-5">
              Lo sentimos el video que estas intentando <br>
              reproducir está en<span class="color-danger"> proceso 
              de grabación ó <br> no existe. </span>
          </p>
          <div>
              <button class="btn btn-outline-danger">Ok gracias</button>
          </div>
      </div>
      `
      let containerError = document.createElement("DIV")
      containerError.classList.add('alert-course','flex','s-main-center','s-cross-center')
      containerError.innerHTML = error
      document.body.appendChild(containerError)
      let btnCloseModal = containerError.children[0].children[2].children[0]
      btnCloseModal.addEventListener('click', e => {
        document.body.removeChild(document.querySelector('.alert-course'))
      })
    }
    
  }
});

function onPlayerReady(event) {
  event.target.playVideo();
}

let done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 0);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
