const myCards = document.getElementById("container");
const resultsArray = [];
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

shuffle(cards);

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

setCards();

const myCardsEl = document.querySelectorAll(".card");
let result = [];
myCardsEl.forEach((item) => {
  item.addEventListener("click", function () {
    this.classList.add("flipped");
    const clickedCard = this.dataset.item;
    result.push(clickedCard);
    matchCards(this);
  });
});

function matchCards(el) {
  setTimeout(() => {
    if (result.length === 2) {
      removeClass(el);
    }
  }, 1000);
}

function removeClass(el) {
  const firstCard = el;
  const secondCard = getSiblings(firstCard);
  console.log(secondCard);
  secondCard.forEach((item) => {
    if (item.dataset.item == firstCard.dataset.item) {
      firstCard.classList.add("same");
      item.classList.add("same");
      firstCard.disabled = true;
      item.disabled = true;
    }
    firstCard.classList.remove("flipped");
    item.classList.remove("flipped");
  });
  result = [];
}
function getSiblings(el) {
  return Array.from(el.parentElement.children).filter(
    (e) => e.classList.contains("flipped") && e !== el
  );
}
