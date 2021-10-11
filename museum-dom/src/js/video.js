const progressInputs = document.querySelectorAll('.progress');
const mainVideosContainer = document.querySelector('#main-video-container');
const mainVideo = document.querySelector('#main-video');
const mainVideos = document.querySelectorAll('.main-video__video');
const mainVideoControls = document.querySelector('#controls');
const playButton = document.querySelector('#play');
const bigPlayButton = document.querySelector('#big-play');
const progressVideoBar = document.querySelector('#timeline');
const soundButton = document.querySelector('#sound');
const progressSoundBar = document.querySelector('#volumeline');
const fullscreenButton = document.querySelector('#fullscreen');
const playbackRateDisplay = document.querySelector('#playbackRate');
const videoWorks = !!document.createElement('video').canPlayType;

  if (videoWorks) {
    mainVideos.forEach( (video) => {
      video.controls = false;
    });
  }


function togglePlay() {
  mainVideos.forEach( (video) => {
    if (video.classList.contains('main-video__video_active')) {
      if (video.paused || video.ended) {
        video.play();
        playButton.classList.remove('ico-play');
        playButton.classList.add('ico-pause');
        bigPlayButton.style.display = 'none';
      } else {
        video.pause();
        playButton.classList.remove('ico-pause');
        playButton.classList.add('ico-play');
        bigPlayButton.style.display = 'inline-block';
      }
    }
  });
}

function playbackRateUp() {
  mainVideos.forEach( (video) => {
    if (video.classList.contains('main-video__video_active')) {
      if (video.playbackRate < 2 ) {
        video.playbackRate += 0.25;
        playbackRateDisplay.style.display = "inline-block";
        playbackRateDisplay.innerText = `${video.playbackRate}x`
        setTimeout(() => {
          playbackRateDisplay.style.display = "none";
        }, 850);
      }
    }
  });
}
function playbackRateDown() {
  mainVideos.forEach( (video) => {
    if (video.classList.contains('main-video__video_active')) {
      if (video.playbackRate > 0.25) {
        video.playbackRate -= 0.25;
        playbackRateDisplay.style.display = "inline-block";
        playbackRateDisplay.innerText = `${video.playbackRate}x`
        setTimeout(() => {
          playbackRateDisplay.style.display = "none";
        }, 850);
      }
    }
  });
}

function initializeVideo() {
  mainVideos.forEach( (video) => {
    if (video.classList.contains('main-video__video_active')) {
      const videoDuration = Math.round(video.duration);
      progressVideoBar.setAttribute('max', videoDuration);
    }
  });
}

function updateProgress() {
  mainVideos.forEach( (video) => {
    if (video.classList.contains('main-video__video_active')) {
      let percent = (video.currentTime.toFixed(0) / video.duration.toFixed(0)) * 100;
      progressVideoBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #c4c4c4 ${percent}%, #c4c4c4 100%)`
      progressVideoBar.value = video.currentTime.toFixed(0);
    }
  });
}

function skipAhead(event) {
  mainVideos.forEach( (video) => {
    if (video.classList.contains('main-video__video_active')) {
      let target = event.target;
      const skipTo = target.dataset.progressVideoBar
        ? target.dataset.progressVideoBar
        : target.value;
      let percent = (video.currentTime  / video.duration) * 100;
      progressVideoBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #c4c4c4 ${percent}%, #c4c4c4 100%)`
      video.currentTime = skipTo;
      progressVideoBar.value = skipTo;
    }
  });
}

function updateVolume() {
  mainVideos.forEach( (video) => {
    if (video.classList.contains('main-video__video_active')) {
      if (video.muted) {
        video.muted = false;
        soundButton.classList.add('ico-mute');
        soundButton.classList.remove('ico-sound');
      }

      video.volume = progressSoundBar.value;
      let step = (video.volume * 100).toFixed(2);
      progressSoundBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${step}%, #c4c4c4 ${step}%, #c4c4c4 100%)`;
      if (!video.volume) {
        soundButton.classList.add('ico-mute');
        soundButton.classList.remove('ico-sound');
      } else {
        soundButton.classList.remove('ico-mute');
        soundButton.classList.add('ico-sound');
      }
    }
  });
}

function toggleMute() {
  mainVideos.forEach( (video) => {
    if (video.classList.contains('main-video__video_active')) {
      video.muted = !video.muted;
      if (video.muted) {
        progressSoundBar.setAttribute('data-volume', progressSoundBar.value);
        progressSoundBar.value = 0;
        soundButton.classList.add('ico-mute');
        soundButton.classList.remove('ico-sound');
        let step = ( progressSoundBar.value * 100).toFixed(2);
        progressSoundBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${step}%, #c4c4c4 ${step}%, #c4c4c4 100%)`
      } else {
        progressSoundBar.value = progressSoundBar.dataset.volume;
        soundButton.classList.remove('ico-mute');
        soundButton.classList.add('ico-sound');
        let step = ( progressSoundBar.value * 100).toFixed(2);
        progressSoundBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${step}%, #c4c4c4 ${step}%, #c4c4c4 100%)`
      }
     }
  });
}

function toggleFullScreen() {
  mainVideos.forEach( (video) => {
    if (video.classList.contains('main-video__video_active')) {
      if (document.fullscreenElement) {
        fullscreenButton.classList.add('ico-fullscreen');
        fullscreenButton.classList.remove('ico-fullscreen-exit');
        progressSoundBar.style.maxWidth = '155px';
        document.exitFullscreen();
      } else if (document.webkitFullscreenElement) {
        // Need this to support Safari
        fullscreenButton.classList.add('ico-fullscreen');
        fullscreenButton.classList.remove('ico-fullscreen-exit');
        progressSoundBar.style.maxWidth = '155px';
        document.webkitExitFullscreen();
      } else if (mainVideo.webkitRequestFullscreen) {
        // Need this to support Safari
        fullscreenButton.classList.add('ico-fullscreen-exit');
        fullscreenButton.classList.remove('ico-fullscreen');
        progressSoundBar.style.maxWidth = '310px';
        mainVideo.webkitRequestFullscreen();
      } else {
        fullscreenButton.classList.add('ico-fullscreen-exit');
        fullscreenButton.classList.remove('ico-fullscreen');
        progressSoundBar.style.maxWidth = '310px';

        mainVideo.requestFullscreen();
      }
    }
  });
}


function keyboardShortcuts(event) {

  const { key } = event;
  const { code } = event;
  console.log(`key:${key}; code:${code}`);
  switch(code) {
    case 'Space':
      togglePlay();
      break;
    case 'KeyM':
      toggleMute();
      break;
    case 'KeyF':
      toggleFullScreen();
      break;
    case 'Period':
      playbackRateUp();
      break;
    case 'Comma':
      playbackRateDown();
      break;
  }
}





playButton.addEventListener('click', togglePlay);
bigPlayButton.addEventListener('click', togglePlay);
mainVideosContainer.addEventListener('click', togglePlay);
mainVideos.forEach( (video) => {
  video.addEventListener('loadedmetadata', initializeVideo);
})
mainVideos.forEach( (video) => {
  video.addEventListener('timeupdate', updateProgress);
})
progressVideoBar.addEventListener('input', skipAhead);
progressSoundBar.addEventListener('input', updateVolume);
soundButton.addEventListener('click', toggleMute);
fullscreenButton.addEventListener('click', toggleFullScreen);
document.addEventListener('keyup', keyboardShortcuts);
