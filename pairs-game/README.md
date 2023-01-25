# 🃏 카드 짝 맞추기 게임
- 제작 기간 : 2023-01-16 ~ 2023-01-26 (11일)
- 사용 언어 : HTML, SCSS, Javascript
- 데모 사이트 : [JAVASCRIPT PAIRS GAME](https://pairs-game-yousunzoo.netlify.app/)


## ✨ 페이지 소개
![image](https://user-images.githubusercontent.com/102499959/214606027-576515b6-a0b7-4468-b928-656c5e1a407d.png)
- 카드 짝 맞추기 게임을 할 수 있습니다.
- 페이지가 로드될 시 카드가 무작위로 섞입니다.


### 카드 섞는 함수
```javascript
let shuffledCards = [];
function shuffle(cards) {
  for (let i = cards.length - 1; i >= 0; i--) {
    let makeRandom = Math.floor(Math.random() * cards.length);
    shuffledCards.push(cards[makeRandom]);
    cards.splice(makeRandom, 1);
  }
  return shuffledCards;
}
```

## 게임 플레이
![start](https://user-images.githubusercontent.com/102499959/214607337-5f083b6e-2263-40d9-bee8-ceea8d209385.gif)
- start 버튼을 누르면 타이머 시작과 동시에 게임이 시작됩니다.
- `new Audio`를 통해 카드 클릭 시 소리가 나도록 했습니다.
- 카드를 클릭하면 `flipped` 클래스가 부여되며 카드가 뒤집어집니다.
- 두 개의 카드가 선택되면, 두 카드의 `data-item` 값이 일치하는지 확인합니다. 일치하면 same 클래스를 부여해서 계속 뒤집어놓고, 일치하지 않으면 두 카드 다 filpped 클래스를 제거합니다.

### 두 카드를 비교하는 함수
```javascript
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
```

## 게임 클리어
![image](https://user-images.githubusercontent.com/102499959/214607058-58e52945-b35d-4220-b99a-98bbe496821c.png)
- 열 쌍의 카드를 모두 맞추면 게임이 종료되고, 걸린 시간을 보여줍니다.
- Play Again 버튼을 누르면 페이지가 reload 됩니다.
