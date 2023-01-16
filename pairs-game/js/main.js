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
for (let i = 0; i <= shuffledCards.length - 1; i++) {
  const cardEl = document.createElement("div");
  cardEl.innerHTML = `<img src = '${require("/images/card.png")}' class='${
    shuffledCards[i]
  }' />`;
  myCards.append(cardEl);
  console.log(i);
}
