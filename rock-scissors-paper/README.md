# 가위바위보 게임기

- 제작 기간 : 2023-01-11 (1일)
- 사용 언어 : `HTML`, `SCSS`, `Javascript`
- 데모 사이트 : [가위바위보](https://rock-scissors-papers-yousunzoo.netlify.app/)
<br/><br/><br/>
## ✨ 페이지 소개
![main](https://user-images.githubusercontent.com/102499959/211748952-6d9d6d98-348f-4b76-99c3-0c5c2c5f8dcf.gif)
- 컴퓨터와 함께 가위바위보 게임을 할 수 있습니다.

<br/><br/>

## 🔎 특징
### 게임 작동 방식
![chrome_bXkmwPv077](https://user-images.githubusercontent.com/102499959/211748509-5bebfd0f-fed9-498d-873d-df37f8dd6b48.gif)
- 사용자의 측에서 선택한 옵션과 컴퓨터 측에서 랜덤으로 출력한 옵션을 비교해서 일반적인 가위바위보 규칙에 따라 점수가 업데이트되는 방식으로 작동합니다.

```javascript
setInterval(function () {
  readyImgs[i].classList.add("show");
  readyImgs[i === 0 ? 2 : i - 1].classList.remove("show");
  if (i === 2) {
    i = 0;
  } else {
    i++;
  }
}, 80);
```
- 사용자가 클릭을 하기 전에는 가위, 바위, 보 이미지가 0.08초 간격으로 돌아가면서 출력됩니다.

<br/>

```javascript
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
```
- `Math.floor(Math.random() * 3)` 함수는 0, 1, 2 중에서 랜덤한 값을 반환합니다.
- `computerAns`가 0일 때는 주먹, 1일 때는 가위, 2일 때는 보 이미지를 출력합니다.

<br><br>

```javascript
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
  ```
  - `Switch`문을 사용해 컴퓨터의 값과 유저의 값을 비교해 알맞은 결과를 출력하고, 승리한 횟수를 업데이트합니다.

<br><br>

![reset](https://user-images.githubusercontent.com/102499959/211751153-68b2187b-5507-49d1-9db7-a6f2e7fa2633.gif)
```javascript
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
```
- 리셋 버튼 클릭 시 `localStorage`에 저장된 값과 보여지는 승리한 횟수가 모두 날아갑니다.

<br><br>

```javascript
let comCount = localStorage.getItem("computer")
  ? Number(localStorage.getItem("computer"))
  : 0;
let userCount = localStorage.getItem("user")
  ? Number(localStorage.getItem("user"))
  : 0;
```
- `localStorage.getItem()`을 통해서 초기 실행 시 각 승리 횟수는 0으로 저장되고, 아니라면 이전에 플레이 했던 데이터를 불러옵니다.

<br><br>

```javascrip
selectBtn.forEach((btn, idx) => {
  btn.addEventListener("click", async function () {
    
    ...

    computerAns = Math.floor(Math.random() * 3);
    
    ...

    await compare(computerAns, userAns);
    
    ...

    localStorage.setItem("computer", comCount);
    localStorage.setItem("user", userCount);
  });
});
```
- 가위, 바위, 보 버튼을 클릭할 때마다 컴퓨터의 값을 정하는 함수가 실행되고, 사용자의 값과 비교하고 나면 `localStorage.setItem()`을 통해 컴퓨터와 사용자의 승리한 횟수를 업데이트 합니다.
