const countdownEl = document.querySelector(".countdown");
const secondEl = countdownEl.querySelector("#seconds");
const milliEl = countdownEl.querySelector("#milli");

let milliCount = 0;
let secondsCount = 0;
export default function timer() {
  milliCount += 1;
  if (milliCount === 100) {
    milliCount = 0;
    secondsCount += 1;
    secondEl.textContent =
      secondsCount < 10 ? `0${secondsCount}` : secondsCount;
  }
  milliEl.textContent = milliCount < 10 ? `00${milliCount}` : `0${milliCount}`;
}
