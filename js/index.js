import TimerController from './timerController.js'

const mobileEnvironments = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const desktop = 'js/desktop.js'
const mobile = 'js/mobile.js'

const timerController = new TimerController()
const oneSecond = 1000
let timerFormatted

window.addEventListener('load', () => {
  startTimer()
  changeTimerValueOnScreen()
  document.getElementById('5minutes').addEventListener('click', handlePresetTimeSelection)
  document.getElementById('25minutes').addEventListener('click', handlePresetTimeSelection)
  document.getElementById('50minutes').addEventListener('click', handlePresetTimeSelection)
  document.getElementById('execute').addEventListener('click', () => executeTimer())
  document.getElementById('reload').addEventListener('click', () => reloadTimer())
  document.getElementById('submit-message').addEventListener('click', submitMessage)
  document.getElementById('hours').addEventListener('keydown', () => { if (timerController.isPlaying) executeTimer() })
  document.getElementById('minutes').addEventListener('keydown', () => { if (timerController.isPlaying) executeTimer() })
  document.getElementById('seconds').addEventListener('keydown', () => { if (timerController.isPlaying) executeTimer() })
  if (mobileEnvironments.test(navigator.userAgent)) setUpEnvironmentWithModule(mobile)
  else setUpEnvironmentWithModule(desktop)
})

function setUpEnvironmentWithModule(module) {
  const head = document.querySelector('head');
  const script = document.createElement('script');
  script.type = 'module';
  script.src = module;
  head.appendChild(script)
}

function startTimer() {
  setInterval(() => {
    if (timerController.isPlaying) {
      timerController.decreaseTimer()
      changeTimerValueOnScreen()
      if (timerController.timeIsOver()) {
        timerController.reloadTimer()
        // changeTimerValueOnScreen()
        playAlarm()
      }
    }
  }, oneSecond)
}

function executeTimer() {
  if (timerController.isPlaying) {
    timerController.executeTimer(false)
    // stopAlarm()
  }
  else timerController.executeTimer(true)
  changeExecuteImage()
}

function handlePresetTimeSelection(event) {
  const timerSplitted = event.target.dataset.time.split(':')
  selectTimer(timerSplitted[0], timerSplitted[1], timerSplitted[2])
  changeTimerValueOnScreen()
  reloadTimer()
}

function updatePresetTimes() {
  const optionItems = document.querySelectorAll('.timer__options--item')
  optionItems.forEach(option => {
    if (option.dataset.time === timerFormatted) option.classList.add('selected')
    else option.classList.remove('selected')
  })
}

function reloadTimer() {
  timerController.reloadTimer()
  changeTimerValueOnScreen()
  changeExecuteImage()
  // stopAlarm()
}

function selectTimer(hours, minutes, seconds) {
  hours = hours > 23 ? 23 : hours
  minutes = minutes > 59 ? 59 : minutes
  seconds = seconds > 59 ? 59 : seconds
  timerController.selectTimer(hours, minutes, seconds)
  timerFormatted = timerController.getTimeFormatted()
  updatePresetTimes()
}

function changeTimerValueOnScreen() {
  timerFormatted = timerController.getTimeFormatted()
  const timerSplitted = timerFormatted.split(':')
  document.getElementById('hours').value = timerSplitted[0]
  document.getElementById('minutes').value = timerSplitted[1]
  document.getElementById('seconds').value = timerSplitted[2]
}

function changeExecuteImage() {
  document.getElementById('execute').src = timerController.isPlaying ? 'src/pause.png' : 'src/play.png'
}

function playAlarm() {
  const alarm = document.getElementById('alarm')
  alarm.currentTime = 0
  alarm.play()
}

// function stopAlarm() {
//   const alarm = document.getElementById('alarm')
//   alarm.pause()
//   alarm.currentTime = 0
// }

function submitMessage(event) {
  event.preventDefault()
}

export { selectTimer }