import { sameBgm, clickBgm, differentBgm, clearBgm } from "./music";
import playHandler from "./timer";
const myCards = document.getElementById("container");
const images = [
  "apple",
  "banana",
  "burger",
  "cake",
  "chocolate",
  "cookie",
  "grape",
  "lemon",
  "meat",
  "watermelon",
];

// 이미지 배열 복제
const cards = [...images, ...images];
const readyEl = document.querySelector(".ready");
const playBtn = readyEl.querySelector("button");
const resultEl = document.querySelector(".result");

// start 버튼 누르면 게임 시작 동시에 오디오 재생
// 타이머 시작
let play;
window.onload = function () {
  shuffle(cards);
  setCards();
};

playBtn.addEventListener("click", function () {
  clickCards();
  readyEl.classList.remove("active");
  play = setInterval(playHandler, 10);
});

// 카드 섞기

let shuffledCards = [];
function shuffle(cards) {
  for (let i = cards.length - 1; i >= 0; i--) {
    let makeRandom = Math.floor(Math.random() * cards.length);
    shuffledCards.push(cards[makeRandom]);
    cards.splice(makeRandom, 1);
  }
  return shuffledCards;
}

// 카드 container에 세팅
function setCards() {
  for (let i = 0; i <= shuffledCards.length - 1; i++) {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.classList.add(shuffledCards[i]);
    cardEl.dataset.item = shuffledCards[i];
    cardEl.dataset.view = "card";
    myCards.append(cardEl);
  }
}

function clickCards() {
  const myCardsEl = document.querySelectorAll(".card");
  let pairedCards = 0;
  let clicked = [];
  let pass = true;

  // 카드 클릭할 때마다 동작 수행
  // 카드 두개 선택 시 일치하는지 비교
  // 일치하지 않으면 다시 뒤집어 놓기
  // 일치하면 카드에 "same" 클래스 추가 및 pairedCards에 +1 처리
  // pairedCards이 10이 되면 게임 종료 및 걸린 시간 출력
  myCardsEl.forEach((item) => {
    item.addEventListener("click", async function () {
      if (pass) {
        pass = false;
        clickBgm();
        this.classList.add("flipped");
        const clickedCard = this.dataset.item;
        clicked.push(clickedCard);
        await compareCards(this);
      }
    });
  });

  async function compareCards(el) {
    if (clicked.length === 2) {
      let promise = new Promise((resolve) => {
        setTimeout(() => resolve(matchCards(el)), 300);
      });

      await promise;
    }
    pass = true;
  }

  function matchCards(el) {
    const firstCard = el;
    const secondCard = getSiblings(firstCard);
    secondCard.forEach((item) => {
      if (item.dataset.item == firstCard.dataset.item) {
        firstCard.classList.add("same");
        item.classList.add("same");
        pairedCards += 1;
        sameBgm();
      } else {
        differentBgm();
      }
      firstCard.classList.remove("flipped");
      item.classList.remove("flipped");
    });
    clicked = [];
    if (pairedCards === 10) endGame();
  }
  function getSiblings(el) {
    return Array.from(el.parentElement.children).filter(
      (e) => e.classList.contains("flipped") && e !== el
    );
  }

  // 결과 표시
  function endGame() {
    clearInterval(play);
    clearBgm();
    resultEl.classList.add("active");
    const resultSecondsEl = resultEl.querySelector(".seconds");
    const resultMilliEl = resultEl.querySelector(".milli");
    const countdownEl = document.querySelector(".countdown");
    const secondEl = countdownEl.querySelector("#seconds");
    const milliEl = countdownEl.querySelector("#milli");
    resultSecondsEl.textContent = secondEl.textContent;
    resultMilliEl.textContent = milliEl.textContent;
    const playAgainBtn = resultEl.querySelector("button");
    playAgainBtn.addEventListener("click", function () {
      location.reload();
    });
  }
}
