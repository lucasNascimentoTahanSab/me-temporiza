const oneSecond = 1000
const pomodoroTitle = 'Pomodoro Timer'
const fiveMinutes = '5'
const twentyFiveMinutes = '25'
const fiftyMinutes = '50'

initialHours = '00'
initialMinutes = '05'
initialSeconds = '00'
pomodoroTimer = initialHours + ':' + initialMinutes + ':' + initialSeconds
window.addEventListener('load', () => {
  document.getElementById('pomodoroTimer').innerHTML = pomodoroTimer
  document.getElementById('pomodoroTitle').innerHTML = pomodoroTitle
  document.getElementById('5minutes').innerHTML = fiveMinutes
  document.getElementById('25minutes').innerHTML = twentyFiveMinutes
  document.getElementById('50minutes').innerHTML = fiftyMinutes
  startTimer()
})

currentHours = parseInt(initialHours)
currentMinutes = parseInt(initialMinutes)
currentSeconds = parseInt(initialSeconds)
isPlaying = false
setIntervalId = null
function startTimer() {
  setIntervalId = setInterval(() => {
    if (isPlaying) {
      decreaseTimer()
      changeTimerValueOnScreen()
      if (timeIsOver()) resetTimerAndPlayAlarm()
    }
  }, oneSecond)
}

function resetTimerAndPlayAlarm() {
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
  changeTimerValueOnScreen()
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

function changeTimerValueOnScreen() {
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

function openCustomOptions() {
  const customOptions = document.getElementById('custom-options');
  const customOptionsButton = document.getElementById('custom-options-button');
  if (customOptions.classList.contains('close')) {
    customOptions.classList.remove('close')
    customOptions.classList.add('open')
    customOptionsButton.classList.remove('close')
    customOptionsButton.classList.add('open')
    this.rotateSticks()
  } else {
    customOptions.classList.remove('open')
    customOptions.classList.add('close')
    customOptionsButton.classList.remove('open')
    customOptionsButton.classList.add('close')
    this.rotateSticks()
  }
}

function rotateSticks() {
  const sticks = document.querySelectorAll('.stick');
  if (sticks.length > 0)
    sticks.forEach(stick => {
      if (stick.classList.contains('rotate-right')) {
        stick.classList.remove('rotate-right')
        stick.classList.add('rotate-left')
      } else if (stick.classList.contains('rotate-left')) {
        stick.classList.remove('rotate-left')
        stick.classList.add('rotate-right')
      }
    })
}

function handleTimeSelection(event) {
  pomodoroTimer = event.target.dataset.time
  updatePresetTimes()
  updateInitialTime()
  updateCurrentTime()
  handleTimerReload()
}

function updatePresetTimes() {
  const optionItems = document.querySelectorAll('.container__options-item')
  optionItems.forEach(option => {
    if (option.dataset.time === pomodoroTimer)
      option.classList.add('selected')
    else
      option.classList.remove('selected')
  })
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