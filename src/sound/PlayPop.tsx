import pop from './pop.mp3'

function PlayPop() {
    var audio = new Audio();
    audio.src = pop;
    audio.volume = .1;
    audio.currentTime = 1.6; // Reset audio to start
    audio.playbackRate = 5;
    audio.play();
}

export default PlayPop;