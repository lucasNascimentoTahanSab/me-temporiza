import Timer from './timer.js'

const oneSecond = 1000
const timer = new Timer()
let timerFormatted
window.addEventListener('load', () => {
  changeTimerValueOnScreen()
  document.getElementById('5minutes').addEventListener('click', event => handleTimerSelection(event))
  document.getElementById('25minutes').addEventListener('click', event => handleTimerSelection(event))
  document.getElementById('50minutes').addEventListener('click', event => handleTimerSelection(event))
  document.getElementById('execute-button').addEventListener('click', () => handleTimerExecution())
  document.getElementById('reload-button').addEventListener('click', () => handleTimerReload())
  document.getElementById('left-last').addEventListener('click', () => goToLast())
  document.getElementById('right-second').addEventListener('click', () => goToRight())
  document.getElementById('left-home').addEventListener('click', () => goToLeft())
  document.getElementById('right-third').addEventListener('click', () => goToRight())
  document.getElementById('left-second').addEventListener('click', () => goToLeft())
  document.getElementById('right-fourth').addEventListener('click', () => goToRight())
  document.getElementById('left-third').addEventListener('click', () => goToLeft())
  document.getElementById('right-last').addEventListener('click', () => goToRight())
  document.getElementById('left-fourth').addEventListener('click', () => goToLeft())
  document.getElementById('right-home').addEventListener('click', () => goToHome())
  startTimer()
})

function startTimer() {
  setInterval(() => {
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

function goToRight() {
  const slideShow = document.getElementById('slide-show')
  const slideSize = slideShow.firstElementChild.clientWidth + (2 * slideShow.firstElementChild.offsetLeft)
  slideShow.scrollLeft += slideSize
}

function goToLeft() {
  const slideShow = document.getElementById('slide-show')
  const slideSize = slideShow.firstElementChild.clientWidth + (2 * slideShow.firstElementChild.offsetLeft)
  slideShow.scrollLeft -= slideSize
}

function goToHome() {
  const slideShow = document.getElementById('slide-show')
  slideShow.scrollLeft -= slideShow.scrollWidth
}

function goToLast() {
  const slideShow = document.getElementById('slide-show')
  slideShow.scrollLeft += slideShow.scrollWidth
}
