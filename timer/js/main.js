// main-stopwatch 작동
// play 버튼 누르면 시작, pause 버튼 누르면 일시정지
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
let hours = 0;
let minutes = 0;
let seconds = 0;
let startTimer;

playBtn.addEventListener("click", function () {
  playBtn.classList.remove("active");
  pauseBtn.classList.add("active");
  startTimer = setInterval(timer, 1000);
});
pauseBtn.addEventListener("click", function () {
  pauseBtn.classList.remove("active");
  playBtn.classList.add("active");
  clearInterval(startTimer);
});

const timer = function () {
  const totalH = document.querySelector(".total-stopwatch .hour");
  const totalM = document.querySelector(".total-stopwatch .minute");
  const totalS = document.querySelector(".total-stopwatch .second");

  // 1초에 한번씩 seconds+=1
  // seconds+=1 값이 60일 시 minutes+=1 하고 seconds = 0
  // minutes+=1 값이 60일 시 hours+=1 하고 minutes = 0

  seconds += 1;
  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }

  if (minutes === 60) {
    hours += 1;
    minutes = 0;
  }

  totalH.textContent = hours < 10 ? `0${hours}` : hours;
  totalM.textContent = minutes < 10 ? `0${minutes}` : minutes;
  totalS.textContent = seconds < 10 ? `0${seconds}` : seconds;
};
