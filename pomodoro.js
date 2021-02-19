const oneSecond = 1000
const oneMinute = oneSecond * 60
const oneHour = oneMinute * 60

const pomodoroTitle = 'Pomodoro Timer'
pomodoroTimer = '00:00:00'
window.onload = () => {
  document.getElementById('pomodoroTitle').innerHTML = pomodoroTitle
  document.getElementById('pomodoroTimer').innerHTML = pomodoroTimer
  startTimer()
}

hours = 0
minutes = 0
seconds = 0
isPlaying = false
setIntervalId = null
function startTimer() {
  setIntervalId = setInterval(() => {
    if (isPlaying) {
      incrementTime()
      changeTimerValue()
    }
  }, oneSecond)
}

function incrementTime() {
  if (minutes + 1 === 60) hours++
  if (seconds + 1 === 60) minutes = incrementMinutesIfMinorThan60()
  seconds = seconds + 1 !== 60 ? seconds + 1 : resetSeconds()
}

function incrementMinutesIfMinorThan60() {
  return minutes < 59 ? incrementMinutes() : resetMinutes()
}

function incrementMinutes() {
  return minutes + 1
}

function resetMinutes() {
  minutes = 0
}

function resetSeconds() {
  seconds = 0
}

function handleTimerExecution() {
  if (isPlaying) pauseTimer()
  else playTimer()
  changeExecuteImage()
}

function playTimer() {
  isPlaying = true
}

function pauseTimer() {
  isPlaying = false
}

function changeExecuteImage() {
  document.getElementById('execute').src = isPlaying ? 'img/pause.png' : 'img/play.png'
}

function handleTimerReload() {
  pauseTimer()
  resetSeconds()
  resetMinutes()
  changeTimerValue()
  changeExecuteImage()
}

function changeTimerValue() {
  formatTimer()
  document.getElementById('pomodoroTimer').innerHTML = pomodoroTimer
}

function formatTimer() {
  const seconds = this.seconds >= 10 ? this.seconds.toString() : '0' + this.seconds.toString()
  const minutes = this.minutes >= 10 ? this.minutes.toString() : '0' + this.minutes.toString()
  const hours = this.hours >= 10 ? this.hours.toString() : '0' + this.hours.toString()

  pomodoroTimer = hours + ':' + minutes + ':' + seconds
}

