# π μΉ΄λ μ§ λ§μΆκΈ° κ²μ
- μ μ κΈ°κ° : 2023-01-16 ~ 2023-01-26 (11μΌ)
- μ¬μ© μΈμ΄ : HTML, SCSS, Javascript
- λ°λͺ¨ μ¬μ΄νΈ : [JAVASCRIPT PAIRS GAME](https://pairs-game-yousunzoo.netlify.app/)


## β¨ νμ΄μ§ μκ°
![image](https://user-images.githubusercontent.com/102499959/214606027-576515b6-a0b7-4468-b928-656c5e1a407d.png)
- μΉ΄λ μ§ λ§μΆκΈ° κ²μμ ν  μ μμ΅λλ€.
- νμ΄μ§κ° λ‘λλ  μ μΉ΄λκ° λ¬΄μμλ‘ μμλλ€.


### μΉ΄λ μλ ν¨μ
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

## κ²μ νλ μ΄
![start](https://user-images.githubusercontent.com/102499959/214607337-5f083b6e-2263-40d9-bee8-ceea8d209385.gif)
- start λ²νΌμ λλ₯΄λ©΄ νμ΄λ¨Έ μμκ³Ό λμμ κ²μμ΄ μμλ©λλ€.
- `new Audio`λ₯Ό ν΅ν΄ μΉ΄λ ν΄λ¦­ μ μλ¦¬κ° λλλ‘ νμ΅λλ€.
- μΉ΄λλ₯Ό ν΄λ¦­νλ©΄ `flipped` ν΄λμ€κ° λΆμ¬λλ©° μΉ΄λκ° λ€μ§μ΄μ§λλ€.
- λ κ°μ μΉ΄λκ° μ νλλ©΄, λ μΉ΄λμ `data-item` κ°μ΄ μΌμΉνλμ§ νμΈν©λλ€. μΌμΉνλ©΄ same ν΄λμ€λ₯Ό λΆμ¬ν΄μ κ³μ λ€μ§μ΄λκ³ , μΌμΉνμ§ μμΌλ©΄ λ μΉ΄λ λ€ filpped ν΄λμ€λ₯Ό μ κ±°ν©λλ€.

### λ μΉ΄λλ₯Ό λΉκ΅νλ ν¨μ
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

## κ²μ ν΄λ¦¬μ΄
![image](https://user-images.githubusercontent.com/102499959/214607058-58e52945-b35d-4220-b99a-98bbe496821c.png)
- μ΄ μμ μΉ΄λλ₯Ό λͺ¨λ λ§μΆλ©΄ κ²μμ΄ μ’λ£λκ³ , κ±Έλ¦° μκ°μ λ³΄μ¬μ€λλ€.
- Play Again λ²νΌμ λλ₯΄λ©΄ νμ΄μ§κ° reload λ©λλ€.
