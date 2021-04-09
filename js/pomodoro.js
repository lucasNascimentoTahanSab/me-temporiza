import Timer from './timer.js'

const oneSecond = 1000
const pomodoroTitle = 'Pomodoro Timer'
const fiveMinutes = '5'
const twentyFiveMinutes = '25'
const fiftyMinutes = '50'
const timer = new Timer()
let pomodoroTimer
window.addEventListener('load', () => {
  changeTimerValueOnScreen()
  document.getElementById('pomodoroTitle').innerHTML = pomodoroTitle
  document.getElementById('5minutes').innerHTML = fiveMinutes
  document.getElementById('25minutes').innerHTML = twentyFiveMinutes
  document.getElementById('50minutes').innerHTML = fiftyMinutes
  document.getElementById('custom-options-button').addEventListener('click', event => openCustomOptions())
  document.getElementById('5minutes').addEventListener('click', event => handleTimerSelection(event))
  document.getElementById('25minutes').addEventListener('click', event => handleTimerSelection(event))
  document.getElementById('50minutes').addEventListener('click', event => handleTimerSelection(event))
  document.getElementById('execute-button').addEventListener('click', () => handleTimerExecution())
  document.getElementById('reload-button').addEventListener('click', event => handleTimerReload())
  startTimer()
})

let setIntervalId = null
function startTimer() {
  setIntervalId = setInterval(() => {
    if (timer.isPlaying) {
      timer.decreaseTimer()
      changeTimerValueOnScreen()
      if (timer.timeIsOver()) {
        timer.handleTimerReload()
        playAlarm()
      }
    }
  }, oneSecond)
}

function handleTimerExecution() {
  if (timer.isPlaying) timer.handleTimerExecution(false)
  else timer.handleTimerExecution(true)
  changeExecuteImage()
}

function handleTimerSelection(event) {
  timer.handleTimerSelection(event.target.dataset.time)

  pomodoroTimer = timer.getTimeFormatted()
  updatePresetTimes()
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

function handleTimerReload() {
  timer.handleTimerReload()
  changeTimerValueOnScreen()
  changeExecuteImage()
}

function changeTimerValueOnScreen() {
  pomodoroTimer = timer.getTimeFormatted()
  document.getElementById('pomodoroTimer').innerHTML = pomodoroTimer
}

function changeExecuteImage() {
  document.getElementById('execute').src = timer.isPlaying ? 'src/pause.png' : 'src/play.png'
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
    rotateSticks()
  } else {
    customOptions.classList.remove('open')
    customOptions.classList.add('close')
    customOptionsButton.classList.remove('open')
    customOptionsButton.classList.add('close')
    rotateSticks()
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