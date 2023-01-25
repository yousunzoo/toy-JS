import click from "../music/click.wav";
import same from "../music/same.wav";
import different from "../music/false.wav";
import clear from "../music/clear.mp3";

export function clickBgm() {
  const audio = new Audio(click);
  audio.load();
  audio.volume = 0.3;
  audio.play();
}

export function sameBgm() {
  const audio = new Audio(same);
  audio.load();
  audio.volume = 0.3;
  audio.play();
}

export function differentBgm() {
  const audio = new Audio(different);
  audio.load();
  audio.volume = 0.3;
  audio.play();
}

export function clearBgm() {
  var audio = new Audio(clear);
  audio.load();
  audio.volume = 0.5;
  audio.play();
}
