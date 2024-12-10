import collect from './collect.mp3';

function PlayClick() { // for playing poof sound
    var audio = new Audio();
    audio.src = collect;
    audio.volume = .3;
    audio.currentTime = .25; // Reset audio to start
    audio.playbackRate = 1;
    audio.play();
}

export default PlayClick;