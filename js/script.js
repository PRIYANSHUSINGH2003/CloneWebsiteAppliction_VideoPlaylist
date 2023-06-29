// let's select all required tags or elements
const mainVideo = document.querySelector('#main-Video');
const musicList = document.querySelector('.music-list');
const playlist = document.getElementById('playlist1');
const videoTitle = document.querySelector('.title');
const menu = document.querySelector(".checkbtn");

videoTitle.onclick = () => {
    playlist.classList.toggle("none")
}

const container = document.querySelector(".container");
const playbox = document.querySelector(".playbox");
const left = document.querySelector(".left1");
const main_Video = document.querySelector(".main-video");
menu.onclick = () => {
    container.classList.toggle('hide');
    playbox.classList.toggle('playbox1');
    left.classList.toggle('left');
    main_Video.classList.toggle('video');
}

const ulTag = document.querySelector("ul");


let musicIndex = 1;
window.addEventListener('load', () => {
    loadMusic(musicIndex);
    playingNow();
})
function playMusic() {
    mainVideo.play();
    playlist.classList.add('active')
}
function loadMusic(indexNumb) {
    mainVideo.src = `${allVideos[indexNumb - 1].src}.mp4`;
    // videoTitle.innerHTML = `${indexNumb}. ${allVideos[indexNumb - 1].name}`

}

for (let i = 0; i < allVideos.length; i++) {
    let liTag = `<li li-index="${i + 1}" class="none1">
      <div class="row">
         <span>${i + 1}. ${allVideos[i].name}</span>
      </div>
      <video class="${allVideos[i].id}" src="${allVideos[i].src}.mp4" style="display: none;" title="${allVideos[i].name}"></video>
      <span id="${allVideos[i].id}" class="duration"></span>
   </li>`;
    playlist.insertAdjacentHTML('beforeend', liTag);

    let liVideoDuration = ulTag.querySelector(`#${allVideos[i].id}`)
    let liVideoTag = ulTag.querySelector(`.${allVideos[i].id}`);


    liVideoTag.addEventListener("loadeddata", () => {
        let videoDuration = liVideoTag.duration;
        let totalMin = Math.floor(videoDuration / 60);
        let totalSec = Math.floor(videoDuration % 60);
        // if totalSec is less then 10 then add 0 at the beginging
        totalSec < 10 ? totalSec = "0" + totalSec : totalSec
        liVideoDuration.innerText = `${totalMin}:${totalSec}`;
        // adding t duration attribe which we'll use below
        liVideoDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    })
}
// let's work on play particular song on click
const allLiTags = playlist.querySelectorAll('li');
function playingNow() {
    for (let j = 0; j < allVideos.length; j++) {
        if (allLiTags[j].classList.contains('playing')) {
            allLiTags[j].classList.remove("playing")
        }
        if (allLiTags[j].getAttribute('li-index') == musicIndex) {
            allLiTags[j].classList.add('playing')
        }
        // adding onclick attribute in all li tags
        allLiTags[j].setAttribute("onclick", "clicked(this)")
    }
}

function clicked(element) {
    // getting li index of particular clicked li tag
    let getIndex = element.getAttribute("li-index");
    musicIndex = getIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

const videoContainer = document.querySelector(".video-container");
const playPauseBtn = document.querySelector(".play-pause-btn");

playPauseBtn.addEventListener("click", togglePlay)
mainVideo.addEventListener("click", togglePlay)

function togglePlay() {
    mainVideo.paused ? mainVideo.play() : mainVideo.pause()
}

mainVideo.addEventListener("play", () => {
    videoContainer.classList.remove("paused")
})

mainVideo.addEventListener("pause", () => {
    videoContainer.classList.add("paused")
})

const fullScreenBtn = document.querySelector(".full-screen-btn")
const muteBtn = document.querySelector(".mute-btn")
const volumeSlider = document.querySelector(".volume-slider")


// Volume
muteBtn.addEventListener("click", toggleMute)
volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value
    mainVideo.muted = e.target.value === 0
})

function toggleMute() {
    mainVideo.muted = !mainVideo.muted
}

mainVideo.addEventListener("volumechange", () => {
    volumeSlider.value = mainVideo.volume
    let volumeLevel
    if (mainVideo.muted || mainVideo.volume === 0) {
        volumeSlider.value = 0
        volumeLevel = "muted"
    } else if (mainVideo.volume >= 0.5) {
        volumeLevel = "high"
    } else {
        volumeLevel = "low"
    }

    videoContainer.dataset.volumeLevel = volumeLevel
})

fullScreenBtn.addEventListener("click", toggleFullScreenMode)

function toggleFullScreenMode() {
    if (document.fullscreenElement == null) {
        videoContainer.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}

document.addEventListener("fullscreenchange", () => {
    videoContainer.classList.toggle("full-screen", document.fullscreenElement)
})

const timelineContainer = document.querySelector(".timeline-container")

timelineContainer.addEventListener("mousemove", e=>{
    const rect = timelineContainer.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.x -rect.x), rect.width) / rect.width
    timelineContainer.style.setProperty("--preview-position", percent)
})

mainVideo.addEventListener("timeupdate",()=>{
    const percent = mainVideo.currentTime / mainVideo.duration
    timelineContainer.style.setProperty("--progress-position",percent)
})

const skiprepeat = document.querySelector(".skip-repeat")

skiprepeat.addEventListener("click", ()=>{
    mainVideo.currentTime =0;
})

const previous = document.querySelector(".previous")
const next = document.querySelector(".next")
var i=0;
previous.addEventListener("click", ()=>{
    if(i<=0) i = allVideos.length;
        i--;
        return setVideo();
})
next.addEventListener('click', ()=>{
    if(i >= allVideos.length - 1) i = -1;
    i++;
    return setVideo();
})

function setVideo(){
    return mainVideo.setAttribute('src', allVideos[i].src + '.mp4');
}


mainVideo.onended = function(){
    if(++i < allVideos.length){         
        mainVideo.src = allVideos[i].src + ".mp4"; 
        mainVideo.play();
    } 
}





























