const pomodoroSelect = document.querySelector("#pomodoro");
const shortBreakSelect = document.querySelector("#short-break");
const longBreakSelect = document.querySelector("#long-break");
const startButton = document.querySelector("#start");
const timerParagraph = document.querySelector("#counter");

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

	const interval = setInterval(() => {
		seconds -= 1;

		timerParagraph.textContent = secondsToMinutesSeconds(seconds);
		if (seconds === 0) {
			clearInterval(interval);
		}
	}, 1000);
}
