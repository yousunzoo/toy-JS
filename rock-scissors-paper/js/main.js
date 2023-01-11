const readyEl = document.querySelector(".ready");
const readyImgs = readyEl.querySelectorAll("img");
let i = 0;

// 로컬 스토리지에 저장된 값 들고 오기

const userScore = document.querySelector(".user-score");
const computerScore = document.querySelector(".computer-score");

let comCount = localStorage.getItem("computer")
  ? Number(localStorage.getItem("computer"))
  : 0;
let userCount = localStorage.getItem("user")
  ? Number(localStorage.getItem("user"))
  : 0;

computerScore.textContent = comCount;
userScore.textContent = userCount;

// 컴퓨터 ready 상태 구현(가위 바위 보 번갈아가면서 출력)
setInterval(function () {
  readyImgs[i].classList.add("show");
  readyImgs[i === 0 ? 2 : i - 1].classList.remove("show");
  if (i === 2) {
    i = 0;
  } else {
    i++;
  }
}, 80);

// 버튼 클릭하면 각 요소의 인덱스 값 할당
const selectBtn = document
  .querySelector(".game-buttons")
  .querySelectorAll("div");
const message = document.querySelector(".message");
const buttonsDiv = document.querySelector(".buttons");
const resultDiv = document.querySelector(".show-result");

const computerImgEl = document
  .querySelector(".screen-computer")
  .querySelector(".choice");
const userImgEl = document
  .querySelector(".screen-user")
  .querySelector(".choice");
const comImg = document.createElement("img");
const userImg = document.createElement("img");

let computerAns, userAns;

// 로컬 스토리지에 데이터 쓰기

selectBtn.forEach((btn, idx) => {
  btn.addEventListener("click", async function () {
    userImgEl.append(userImg);
    computerImgEl.append(comImg);

    computerAns = Math.floor(Math.random() * 3);
    userAns = idx;

    if (computerAns === 0) comImg.src = require("../images/rock.png");
    comImg.alt = "rock";
    if (computerAns === 1) comImg.src = require("../images/scissors.png");
    comImg.alt = "scissors";
    if (computerAns === 2) comImg.src = require("../images/paper.png");
    comImg.alt = "paper";

    if (userAns === 0) userImg.src = require("../images/rock.png");
    userImg.alt = "rock";
    if (userAns === 1) userImg.src = require("../images/scissors.png");
    userImg.alt = "scissors";
    if (userAns === 2) userImg.src = require("../images/paper.png");
    userImg.alt = "paper";

    computerImgEl.classList.remove("hide");
    readyEl.classList.add("hide");

    await compare(computerAns, userAns);
    buttonsDiv.classList.add("hide");
    resultDiv.classList.remove("hide");
    computerScore.textContent = comCount;
    userScore.textContent = userCount;

    localStorage.setItem("computer", comCount);
    localStorage.setItem("user", userCount);
  });
});

let compare = function (com, user) {
  switch (user) {
    case 0:
      if (com === 0) {
        message.textContent = "비겼다~";
      }
      if (com === 1) {
        message.textContent = "야호 내가 이겼다~!";
        userCount += 1;
      }
      if (com === 2) {
        message.textContent = "이런! 져버리다니...";
        comCount += 1;
      }
      break;
    case 1:
      if (com === 0) {
        message.textContent = "이런! 져버리다니...";
        comCount += 1;
      }
      if (com === 1) {
        message.textContent = "비겼다~";
      }
      if (com === 2) {
        message.textContent = "야호 내가 이겼다~!";
        userCount += 1;
      }
      break;
    case 2:
      if (com === 0) {
        message.textContent = "야호 내가 이겼다~!";
        userCount += 1;
      }
      if (com === 1) {
        message.textContent = "이런! 져버리다니...";
        comCount += 1;
      }
      if (com === 2) {
        message.textContent = "비겼다~";
      }
      break;
  }
};

// 버튼 클릭 시 다음 게임 진행
const nextBtn = document.querySelector(".show-result").querySelector("button");

nextBtn.addEventListener("click", function () {
  buttonsDiv.classList.remove("hide");
  resultDiv.classList.add("hide");

  computerImgEl.classList.add("hide");
  readyEl.classList.remove("hide");

  computerImgEl.innerHTML = "";
  userImgEl.innerHTML = "";
});

// 리셋 버튼 클릭 시 점수 날림
const resetBtn = document.querySelector(".btn-reset");

resetBtn.addEventListener("click", function () {
  comCount = 0;
  userCount = 0;
  computerScore.textContent = comCount;
  userScore.textContent = userCount;

  buttonsDiv.classList.remove("hide");
  resultDiv.classList.add("hide");
  localStorage.setItem("computer", 0);
  localStorage.setItem("user", 0);
});
