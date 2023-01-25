const click = require("../music/click.wav");
const same = require("../music/same.wav");
const different = require("../music/false.wav");
const clear = require("../music/clear.mp3");

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
