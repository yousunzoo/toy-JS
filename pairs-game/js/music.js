import bgm from "../music/game_bgm.mp3";
import click from "../music/click.wav";
import same from "../music/same.wav";
import different from "../music/false.wav";

export function playBgm() {
  var audio = new Audio(bgm);
  audio.load();
  audio.volume = 0.3;
  audio.play();
}

export function clickBgm() {
  var audio = new Audio(click);
  audio.load();
  audio.volume = 0.5;
  audio.play();
}

export function sameBgm() {
  var audio = new Audio(same);
  audio.load();
  audio.volume = 0.5;
  audio.play();
}

export function differentBgm() {
  var audio = new Audio(different);
  audio.load();
  audio.volume = 0.5;
  audio.play();
}
