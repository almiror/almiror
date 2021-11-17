let tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;

//VARIABLE PARA LA URL DE LOS VIDEOS
let getURLVideo
const getContenItemPlaylist = document.querySelector('.container-playlist-items')
getContenItemPlaylist.addEventListener('click', e => {
  if(e.target.tagName === "LI" && e.target.classList.contains('temary-subitem')) {
    //OBTENEMOS EL ID DEL VIDEO PARA LA REPRODUCCIÓN
    getURLVideo = e.target.getAttribute('urlVideoPlayer')
    
    document.querySelector('.description-video-actual').innerText = e.target.getAttribute('descriptionVideo')
    document.querySelector('.title-video-actual').innerText = e.target.innerText

    //REPRODUCIMOS EL VIDEO DE YOUTUBE
    player = new YT.Player("player", {
      videoId: getURLVideo,
      playerVars: {'controls':1, 'fs':0,'end':100,'cc_load_policy':1,'modestbranding':1,'iv_load_policy':3,'showinfo':1,'fs':1},
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      }
    });



  }
})

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: getURLVideo,
    playerVars: {'controls':1, 'fs':0,'end':100,'cc_load_policy':1,'modestbranding':1,'iv_load_policy':3,'showinfo':1,'fs':1},
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    }
  });
}


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
