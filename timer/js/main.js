// main-stopwatch 작동
// play 버튼 누르면 시작, pause 버튼 누르면 일시정지
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");

playBtn.addEventListener("click", function () {
  playBtn.classList.remove("active");
  pauseBtn.classList.add("active");
});
pauseBtn.addEventListener("click", function () {
  pauseBtn.classList.remove("active");
  playBtn.classList.add("active");
});
