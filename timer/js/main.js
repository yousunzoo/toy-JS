// main-stopwatch 작동
// play 버튼 누르면 시작, pause 버튼 누르면 일시정지
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
let total = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

let focusedTime = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

let basicSubject = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

let subjects = {
  공부: basicSubject,
};

// 창 켜질 때 localStorage에 저장된 값 있으면 불러오기
window.onload = async function () {
  const loadTotal = localStorage.getItem("total");
  loadTotal ? (total = JSON.parse(loadTotal)) : total;
  localStorage.setItem("total", JSON.stringify(total));
  const loadSubjects = localStorage.getItem("subjects");

  loadSubjects
    ? loadSubjects
    : localStorage.setItem("subjects", JSON.stringify(subjects));
  setTotalText();
  if (loadSubjects) setSubjectList(JSON.parse(loadSubjects));
};

let startTimer, focused;
const modal = document.querySelector("#modal");
let focusModal = document.querySelector(".focus-modal");
let unavailableEl = document.querySelector(".unavailable");

// 플레이 버튼 누르면 타이머 시작
// 쉬는 시간 10초 지나면 현재 집중 시간 리셋
let count = 10;
const subjectName = document.querySelector(".subject-stopwatch .name");

playBtn.addEventListener("click", function () {
  setSubjectName();
  if (subjectName.textContent === "과목 집중 시간") {
    modal.style.display = "block";
    modal.querySelector(".choose-subject").classList.add("active");
    const closeBtn = modal.querySelector(".choose-subject button");
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.style.display = "none";
      modal.querySelector(".choose-subject").classList.remove("active");
    });
  } else {
    playBtn.classList.remove("active");
    pauseBtn.classList.add("active");
    startTimer = setInterval(timer, 1000);
    clearInterval(focused);
    unavailableEl.classList.add("active");
    let subjectFocus = setSubjectTimer();
    console.log(subjectFocus);
  }
});

// 일시정지 버튼 누르면 타이머 중단, 집중 모달 등장

pauseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  pauseBtn.classList.remove("active");
  playBtn.classList.add("active");
  clearInterval(startTimer);
  localStorage.setItem("total", JSON.stringify(total));
  modal.style.display = "block";
  focusModal.classList.add("active");

  count = 10;
  focused = setInterval(countFocus, 1000);
  unavailableEl.classList.remove("active");
});

const timer = function () {
  totalCountUp();
  setTotalText();
  focusCountUp();
  setFocusText();
};

const countFocus = function () {
  count -= 1;
  let countText = document.querySelector(".remaining-count");
  countText.innerText = count;

  if (count === 0) {
    clearInterval(focused);
    modal.style.display = "none";
    focusModal.classList.remove("active");
    focusedTime = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    setFocusText();
  }
};

const totalCountUp = function () {
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
const focusCountUp = function () {
  // 1초에 한번씩 seconds+=1
  // seconds+=1 값이 60일 시 minutes+=1 하고 seconds = 0
  // minutes+=1 값이 60일 시 hours+=1 하고 minutes = 0
  let {
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
  } = focusedTime;
  totalSeconds += 1;

  if (totalSeconds === 60) {
    totalMinutes += 1;
    totalSeconds = 0;
  }

  if (totalMinutes === 60) {
    totalHours += 1;
    totalMinutes = 0;
  }
  return (focusedTime = {
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
  });
};
const setFocusText = function () {
  let {
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
  } = focusedTime;
  const totalH = document.querySelector(".focus-stopwatch .hour");
  const totalM = document.querySelector(".focus-stopwatch .minute");
  const totalS = document.querySelector(".focus-stopwatch .second");
  totalH.textContent = totalHours < 10 ? `0${totalHours}` : totalHours;
  totalM.textContent = totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes;
  totalS.textContent = totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds;
};

// 모달 창 띄우기
const addSubjectBtn = document.querySelector(".add-subject");
const addSubjectModal = modal.querySelector(".add-subject-modal");
addSubjectBtn.addEventListener("click", () => {
  modal.style.display = "block";
  addSubjectModal.classList.add("active");
});

// 모달 창에서 과목 추가
const modalBtn = modal.querySelector("button");
const modalInput = modal.querySelector("input");
const subjectList = document.querySelector(".subject-list");

modalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const subjectN = modalInput.value;
  if (subjectN === "") {
    modalInput.classList.add("no-name");
  } else {
    addSubject(subjectN);
    modalInput.classList.remove("no-name");
  }
});

const addSubject = (subjectN) => {
  setSubjectLi(subjectN);
  modal.style.display = "none";
  addSubjectModal.classList.remove("active");
  modalInput.value = "";

  // localStorage에 과목명으로 된 객체 추가
  const subjectItem = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  subjects[subjectN] = subjectItem;
  localStorage.setItem("subjects", JSON.stringify(subjects));
};

const setSubjectList = (loadSubjects) => {
  subjectList.innerHTML = "";
  for (subjectN in loadSubjects) {
    setSubjectLi(subjectN);
  }
};

function setSubjectLi(subjectN) {
  let subjectLi = document.createElement("li");
  subjectLi.innerHTML = `<p class="subject-name">${subjectN}</p>
<input type="radio" name='subject' value='${subjectN}' />`;
  subjectList.append(subjectLi);
}

// 집중 시간 모달 버튼 클릭하면 모달 닫기
const focusModalCloseBtn = focusModal.querySelector("button");

focusModalCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "none";
  focusModal.classList.remove("active");
});

// 과목 input 체크하면 과목 집중 시간 세팅

function setSubjectTimer() {}

function setSubjectName() {
  const chooseSubject = document.querySelectorAll(".subject-list input");

  chooseSubject.forEach((subject) => {
    if (subject.checked) {
      subjectName.textContent = subject.value;
      const subjectData = JSON.parse(localStorage.getItem("subjects"))[
        subject.value
      ];
      const { hours, minutes, seconds } = subjectData;
      const subjectTimerEl = document.querySelector(
        ".subject-stopwatch .timer"
      );
      const subjectH = subjectTimerEl.querySelector(".hour");
      const subjectM = subjectTimerEl.querySelector(".minute");
      const subjectS = subjectTimerEl.querySelector(".second");
      subjectH.textContent = hours < 10 ? `0${hours}` : hours;
      subjectM.textContent = minutes < 10 ? `0${minutes}` : minutes;
      subjectS.textContent = seconds < 10 ? `0${seconds}` : seconds;
    }
  });
}
