// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progess =  player.querySelector('.progress');
const progessBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('#fullScreen');

// Functions
function togglePlay() {
    if( video.paused ){
        video.play();
    } else {
        video.pause();
    }
}

function updateButton(){
    toggle.textContent = video.paused ? '►' : '||';
}

function skip() {
    video.currentTime = video.currentTime + parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    if(this.name === 'volume'){
        video.volume = this.value;
    } else {
        video.playbackRate = this.value;
    }
}

function progressUpdate(){
    let prog = (video.currentTime/video.duration)*100;
    progessBar.style.flexBasis = `${prog}%`;
}

function scrub(e){
    video.currentTime = (e.offsetX/progess.offsetWidth)*video.duration;
}

function handleFullScreen(){
    video.requestFullscreen();
}
// Listeners

// Click play/pause button and video
toggle.addEventListener( 'click', togglePlay );
video.addEventListener( 'click', togglePlay );
// Update play/pause button
video.addEventListener( 'play', updateButton );
video.addEventListener( 'pause', updateButton );

// Skip
skipButtons.forEach( e => e.addEventListener( 'click', skip ) )

// Ranges
ranges.forEach( e=> e.addEventListener('change',handleRangeUpdate ) );

// Video progress
video.addEventListener( 'timeupdate', progressUpdate );
progess.addEventListener( 'click', scrub )
let mouseDown = false;
progess.addEventListener( 'mousemove', (e)=> mouseDown && scrub );
progess.addEventListener( 'mousedown', ()=> mouseDown=true );
progess.addEventListener( 'mouseup', ()=> mouseDown=false );

// Full screen
fullScreen.addEventListener('click', handleFullScreen)