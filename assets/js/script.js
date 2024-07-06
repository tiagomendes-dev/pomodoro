const pomodoroSelect = document.querySelector("#pomodoro");
const shortBreakSelect = document.querySelector("#short-break");
const longBreakSelect = document.querySelector("#long-break");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#stop");
const resumeButton = document.querySelector("#resume");
const timerParagraph = document.querySelector("#counter");

let isPaused = false;
let interval;

let selectedTimer = "pomodoro";

function changeSelectClasses(timer) {
  if (timer === "pomodoro") {
    pomodoroSelect.classList.add("active-button");
    shortBreakSelect.classList.remove("active-button");
    longBreakSelect.classList.remove("active-button");
  } else if (timer === "short-break") {
    pomodoroSelect.classList.remove("active-button");
    shortBreakSelect.classList.add("active-button");
    longBreakSelect.classList.remove("active-button");
  } else if (timer === "long-break") {
    pomodoroSelect.classList.remove("active-button");
    shortBreakSelect.classList.remove("active-button");
    longBreakSelect.classList.add("active-button");
  }
}

function blockButtons() {
  pomodoroSelect.disabled = true;
  shortBreakSelect.disabled = true;
  longBreakSelect.disabled = true;
  pomodoroSelect.classList.add("text-[#F4EDDB]/50");
  shortBreakSelect.classList.add("text-[#F4EDDB]/50");
  longBreakSelect.classList.add("text-[#F4EDDB]/50");
}

function enableButtons() {
  pomodoroSelect.disabled = false;
  shortBreakSelect.disabled = false;
  longBreakSelect.disabled = false;
  pomodoroSelect.classList.remove("text-[#F4EDDB]/50");
  shortBreakSelect.classList.remove("text-[#F4EDDB]/50");
  longBreakSelect.classList.remove("text-[#F4EDDB]/50");
}

function secondsToMinutesSeconds(seconds) {
  return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? "0" : ""}${seconds % 60}`;
}

function getTimerValue(timer) {
  return {
    pomodoro: 25 * 60,
    "short-break": 5 * 60,
    "long-break": 15 * 60,
  }[timer];
}

function changeTimerValue(timer) {
  timerParagraph.textContent = secondsToMinutesSeconds(getTimerValue(timer));
}

function selectTimer(timer) {
  selectedTimer = timer;

  changeSelectClasses(timer);
  changeTimerValue(timer);
}

function startTimer(timer) {
  let seconds = getTimerValue(timer);
  interval = setInterval(() => {
    if (!isPaused) {
      seconds -= 1;
    }

    timerParagraph.textContent = secondsToMinutesSeconds(seconds);
    if (seconds === 0) {
      clearInterval(interval);

      enableButtons();
    }
  }, 1000);
  blockButtons();

  startButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
  resumeButton.classList.add("hidden");
}

function pauseTimer() {
  isPaused = true;
  startButton.classList.add("hidden");
  pauseButton.classList.add("hidden");
  resumeButton.classList.remove("hidden");

  enableButtons();
}

function resumeTimer(timer) {
  isPaused = false;
  startButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
  resumeButton.classList.add("hidden");
}
