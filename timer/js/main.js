// main-stopwatch 작동
// play 버튼 누르면 시작, pause 버튼 누르면 일시정지
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
let total = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

// 창 켜질 때 localStorage에 저장된 값 있으면 불러오기
window.onload = function () {
  const loadTotal = localStorage.getItem("total");
  loadTotal ? (total = JSON.parse(loadTotal)) : total;

  setTotalText();
};

let startTimer;

playBtn.addEventListener("click", function () {
  playBtn.classList.remove("active");
  pauseBtn.classList.add("active");
  startTimer = setInterval(timer, 1000);
});
pauseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  pauseBtn.classList.remove("active");
  playBtn.classList.add("active");
  clearInterval(startTimer);
  localStorage.setItem("total", JSON.stringify(total));
});

const timer = function () {
  countUp();
  setTotalText();
};

const countUp = function () {
  // 1초에 한번씩 seconds+=1
  // seconds+=1 값이 60일 시 minutes+=1 하고 seconds = 0
  // minutes+=1 값이 60일 시 hours+=1 하고 minutes = 0
  let {
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
  } = total;
  totalSeconds += 1;

  if (totalSeconds === 60) {
    totalMinutes += 1;
    totalSeconds = 0;
  }

  if (totalMinutes === 60) {
    totalHours += 1;
    totalMinutes = 0;
  }
  return (total = {
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
  });
};
const setTotalText = function () {
  let {
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
  } = total;
  const totalH = document.querySelector(".total-stopwatch .hour");
  const totalM = document.querySelector(".total-stopwatch .minute");
  const totalS = document.querySelector(".total-stopwatch .second");
  totalH.textContent = totalHours < 10 ? `0${totalHours}` : totalHours;
  totalM.textContent = totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes;
  totalS.textContent = totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds;
};
