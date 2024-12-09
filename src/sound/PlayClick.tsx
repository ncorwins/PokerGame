import click from './click.m4a';

function PlayClick() { // for playing poof sound
    var audio = new Audio();
    audio.src = click;
    audio.volume = .2;
    audio.currentTime = 1; // Reset audio to start
    audio.playbackRate = 1;
    audio.play();
}

export default PlayClick;