
const oneSecond = 1000
const oneMinute = oneSecond * 60

const pomodoroTitle = 'Pomodoro Timer'
pomodoroTimer = '00:00:00'
window.onload = () => {
  document.getElementById('pomodoroTitle').innerHTML = pomodoroTitle;
  document.getElementById('pomodoroTimer').innerHTML = pomodoroTimer;
  startTimer()
}

let setIntervalId
seconds = 0
minutes = 0
const startTimer = () => {
  setIntervalId = setInterval(() => {
    if (isPlaying) {
      seconds = seconds < 59 ? seconds + 1 : resetSeconds()
      minutes = seconds === 0 ? minutes + 1 : minutes
      minutes = minutes < 59 ? minutes : resetMinutes()
      changeTimerValue()
    }
  }, oneSecond)
}

function resetSeconds() {
  seconds = 0
}

function resetMinutes() {
  minutes = 0
}

isPlaying = false;
function handleTimerExecution() {
  if (isPlaying) pauseTimer()
  else playTimer()
}

function playTimer() {
  isPlaying = true
}

function pauseTimer() {
  isPlaying = false;
}

function handleTimerReload() {
  pauseTimer()
  resetSeconds()
  resetMinutes()
  changeTimerValue()
}

function changeTimerValue() {
  formatTimer()
  document.getElementById('pomodoroTimer').innerHTML = pomodoroTimer;
}

function formatTimer() {
  const seconds = this.seconds >= 10 ? this.seconds.toString() : '0' + this.seconds.toString()
  const minutes = this.minutes >= 10 ? this.minutes.toString() : '0' + this.minutes.toString()

  pomodoroTimer = '00:' + minutes + ':' + seconds
}

