import TimerController from './timerController.js'

const mobileEnvironments = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const desktop = 'js/desktop.js'
const mobile = 'js/mobile.js'

const timerController = new TimerController()
const oneSecond = 1000
let timeFormatted
let timeout

window.addEventListener('load', () => {
  selectTimer('00', '05', '00')
  changeTimerValueOnScreen()
  document.getElementById('execute').addEventListener('click', toggleTimerMode)
  document.getElementById('reload').addEventListener('click', reloadTimer)
  document.getElementById('hours').addEventListener('keydown', () => { if (timerController.isPlaying) toggleTimerModeWhenPlaying() })
  document.getElementById('minutes').addEventListener('keydown', () => { if (timerController.isPlaying) toggleTimerModeWhenPlaying() })
  document.getElementById('seconds').addEventListener('keydown', () => { if (timerController.isPlaying) toggleTimerModeWhenPlaying() })
  document.getElementById('5minutes').addEventListener('click', handlePresetTimeSelection)
  document.getElementById('25minutes').addEventListener('click', handlePresetTimeSelection)
  document.getElementById('50minutes').addEventListener('click', handlePresetTimeSelection)
  document.getElementById('alarm').addEventListener('pause', reloadTimer)
  document.getElementById('submit-message').addEventListener('click', submitMessage)
  if (mobileEnvironments.test(navigator.userAgent)) setUpEnvironmentWithModule(mobile)
  else setUpEnvironmentWithModule(desktop)
})

function handlePresetTimeSelection(event) {
  const timeSplitted = event.target.dataset.time.split(':')
  selectTimer(timeSplitted[0], timeSplitted[1], timeSplitted[2])
  changeTimerValueOnScreen()
  reloadTimer()
}

function selectTimer(hours, minutes, seconds) {
  if (hours > 23) hours = 23
  if (minutes > 59) minutes = 59
  if (seconds > 59) seconds = 59
  timerController.selectTimer(hours, minutes, seconds)
  timeFormatted = timerController.getTimeFormatted()
  updatePresetTimes()
}

function toggleTimerMode() {
  if (timerController.isPlaying) return toggleTimerModeWhenPlaying()
  if (alarmIsPlaying()) return toggleTimerModeWhenAlarmPlaying()

  return toggleTimerModeWhenNotPlaying()
}

function toggleTimerModeWhenPlaying() {
  timerController.toggleTimerMode(false)
  changeExecuteImage()
  stopTimer()
}

function toggleTimerModeWhenAlarmPlaying() {
  timerController.toggleTimerMode(false)
  changeExecuteImage()
  stopAlarm()
}

function toggleTimerModeWhenNotPlaying() {
  timerController.toggleTimerMode(true)
  changeExecuteImage()
  startTimer()
}

function reloadTimer() {
  stopTimer()
  timerController.reloadTimer()
  changeTimerValueOnScreen()
  changeExecuteImage()
  stopAlarm()
}

function stopTimer() {
  clearTimeout(timeout)
}

function startTimer() {
  timeout = setTimeout(countDown, oneSecond)
}

function countDown() {
  updateTimer()
  if (!timerController.timeIsOver()) {
    timeout = setTimeout(countDown, oneSecond)
    return
  }

  reloadTimer()
  playAlarm()
}

function updateTimer() {
  timerController.updateTimer()
  changeTimerValueOnScreen()
}

function changeTimerValueOnScreen() {
  timeFormatted = timerController.getTimeFormatted()
  const timeSplitted = timeFormatted.split(':')
  document.getElementById('hours').value = timeSplitted[0]
  document.getElementById('minutes').value = timeSplitted[1]
  document.getElementById('seconds').value = timeSplitted[2]
}

function updatePresetTimes() {
  const optionItems = document.querySelectorAll('.timer__options--item')
  optionItems.forEach(option => {
    if (option.dataset.time === timeFormatted) option.classList.add('selected')
    else option.classList.remove('selected')
  })
}

function alarmIsPlaying() {
  return !document.getElementById('alarm').paused
}

function playAlarm() {
  const alarm = document.getElementById('alarm')
  alarm.currentTime = 0
  alarm.play()
}

function stopAlarm() {
  const alarm = document.getElementById('alarm')
  alarm.pause()
  alarm.currentTime = 0
}

function changeExecuteImage() {
  document.getElementById('execute').src = timerController.isPlaying ? 'src/pause.png' : 'src/play.png'
}

function submitMessage(event) {
  event.preventDefault()
}

/**
 * Method responsible for setting up the DOM
 * with the environment correspondent script,
 * to avoid extra script loading.
 */
function setUpEnvironmentWithModule(module) {
  const head = document.querySelector('head')
  const script = document.createElement('script')
  script.type = 'module'
  script.src = module
  head.appendChild(script)
}

export { selectTimer }