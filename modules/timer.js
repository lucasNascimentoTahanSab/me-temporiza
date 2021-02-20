const oneSecond = 1000

initialHours = '00'
initialMinutes = '05'
initialSeconds = '00'
pomodoroTimer = initialHours + ':' + initialMinutes + ':' + initialSeconds
window.addEventListener('load', () => {
  document.getElementById('pomodoroTimer').innerHTML = pomodoroTimer
  startTimer()
})

function handleTimeSelection(event) {
  pomodoroTimer = event.target.dataset.time
  updateInitialTime()
  updateCurrentTime()
  handleTimerReload()
}

function updateInitialTime() {
  timerElements = pomodoroTimer.split(':')

  initialHours = timerElements[0]
  initialMinutes = timerElements[1]
  initialSeconds = timerElements[2]
}

function updateCurrentTime() {
  currentHours = parseInt(initialHours)
  currentMinutes = parseInt(initialMinutes)
  currentSeconds = parseInt(initialSeconds)
}

currentHours = parseInt(initialHours)
currentMinutes = parseInt(initialMinutes)
currentSeconds = parseInt(initialSeconds)
isPlaying = false
setIntervalId = null
function startTimer() {
  setIntervalId = setInterval(() => {
    if (isPlaying) {
      decreaseTimer()
      changeTimerValue()
      if (timeIsOver())
        stopTimer()
    }
  }, oneSecond)
}

function stopTimer() {
  pauseTimer()
  resetHours()
  resetMinutes()
  resetSeconds()
  changeExecuteImage()
  playAlarm()
}

function decreaseTimer() {
  currentSeconds = currentSeconds > 0 ? currentSeconds - 1 : 59
  currentMinutes = currentSeconds === 59 && currentMinutes > 0 ? currentMinutes - 1 : currentMinutes
  currentHours = currentMinutes === 59 && currentHours > 0 ? currentHours - 1 : currentHours
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
  document.getElementById('execute').src = isPlaying ? 'src/pause.png' : 'src/play.png'
}

function handleTimerReload() {
  pauseTimer()
  resetHours()
  resetSeconds()
  resetMinutes()
  changeTimerValue()
  changeExecuteImage()
}

function resetHours() {
  currentHours = parseInt(initialHours)
}

function resetMinutes() {
  currentMinutes = parseInt(initialMinutes)
}

function resetSeconds() {
  currentSeconds = parseInt(initialSeconds)
}

function changeTimerValue() {
  formatTimer()
  document.getElementById('pomodoroTimer').innerHTML = pomodoroTimer
}

function formatTimer() {
  pomodoroTimer = formatHours() + ':' + formatMinutes() + ':' + formatSeconds()
}

function formatHours() {
  return this.currentHours >= 10 ? this.currentHours.toString() : '0' + this.currentHours.toString()
}

function formatMinutes() {
  return this.currentMinutes >= 10 ? this.currentMinutes.toString() : '0' + this.currentMinutes.toString()
}

function formatSeconds() {
  return this.currentSeconds >= 10 ? this.currentSeconds.toString() : '0' + this.currentSeconds.toString()
}

function timeIsOver() {
  return currentHours === 0 && currentMinutes === 0 && currentSeconds === 0
}

function playAlarm() {
  document.getElementById('alarm').play();
}