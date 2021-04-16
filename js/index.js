import Timer from './timer.js'

const oneSecond = 1000
const timerTitle = 'Me Temporiza!'
const fiveMinutes = '5'
const twentyFiveMinutes = '25'
const fiftyMinutes = '50'
const timer = new Timer()
let timerFormatted
window.addEventListener('load', () => {
  changeTimerValueOnScreen()
  document.getElementById('timer-title').innerHTML = timerTitle
  document.getElementById('5minutes').innerHTML = fiveMinutes
  document.getElementById('25minutes').innerHTML = twentyFiveMinutes
  document.getElementById('50minutes').innerHTML = fiftyMinutes
  document.getElementById('5minutes').addEventListener('click', event => handleTimerSelection(event))
  document.getElementById('25minutes').addEventListener('click', event => handleTimerSelection(event))
  document.getElementById('50minutes').addEventListener('click', event => handleTimerSelection(event))
  document.getElementById('execute-button').addEventListener('click', () => handleTimerExecution())
  document.getElementById('reload-button').addEventListener('click', () => handleTimerReload())
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

  changeTimerValueOnScreen()
  updatePresetTimes()
  handleTimerReload()
}

function updatePresetTimes() {
  const optionItems = document.querySelectorAll('.timer__options--item')
  optionItems.forEach(option => {
    if (option.dataset.time === timerFormatted)
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
  timerFormatted = timer.getTimeFormatted()
  document.getElementById('timer-formatted').innerHTML = timerFormatted
}

function changeExecuteImage() {
  document.getElementById('execute').src = timer.isPlaying ? 'src/pause.png' : 'src/play.png'
}

function playAlarm() {
  document.getElementById('alarm').play()
}