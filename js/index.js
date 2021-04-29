import TimerController from './timerController.js'

const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const timerController = new TimerController()
const oneSecond = 1000
let timerFormatted
const slides = []
window.addEventListener('load', () => {
  defineSlides()
  defineCurrentSlide()
  changeTimerValueOnScreen()
  document.getElementById('5minutes').addEventListener('click', handlePresetTimeSelection)
  document.getElementById('25minutes').addEventListener('click', handlePresetTimeSelection)
  document.getElementById('50minutes').addEventListener('click', handlePresetTimeSelection)
  document.getElementById('execute').addEventListener('click', () => executeTimer())
  document.getElementById('reload').addEventListener('click', () => reloadTimer())
  document.getElementById('left-last').addEventListener('click', () => goToLast())
  document.getElementById('right-second').addEventListener('click', () => goToNext())
  document.getElementById('left-home').addEventListener('click', () => goToLast())
  document.getElementById('right-third').addEventListener('click', () => goToNext())
  document.getElementById('left-second').addEventListener('click', () => goToLast())
  document.getElementById('right-fourth').addEventListener('click', () => goToNext())
  document.getElementById('left-third').addEventListener('click', () => goToLast())
  document.getElementById('right-last').addEventListener('click', () => goToNext())
  document.getElementById('left-fourth').addEventListener('click', () => goToLast())
  document.getElementById('right-home').addEventListener('click', () => goToNext())
  document.getElementById('submit-message').addEventListener('click', submitMessage)
  if (!mobile.test(navigator.userAgent)) setDesktopEvents()
  else setMobileEvents()
  startTimer()
})

window.addEventListener('resize', () => {
  manageWindowResize()
})

function setDesktopEvents() {
  $('#hours').keypress(handleCustomTimeSelection)
  $('#minutes').keypress(handleCustomTimeSelection)
  $('#seconds').keypress(handleCustomTimeSelection)
  $('#hours').keydown(handleBackspacePressed)
  $('#minutes').keydown(handleBackspacePressed)
  $('#seconds').keydown(handleBackspacePressed)
}

/**
 * Method responsible for defining mobile events
 * only. Some events such as keyboard events does
 * not work properly on mobile devices, so the following
 * are meant to be a workaround to problems like that. 
 */
function setMobileEvents() {
  $('#hours').change(handleCustomTimeSelectionOnMobile)
  $('#minutes').change(handleCustomTimeSelectionOnMobile)
  $('#seconds').change(handleCustomTimeSelectionOnMobile)
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

function handleCustomTimeSelection(event) {
  if (event.key < '0' || event.key > '9') return false

  const characters = event.target.value.split('')
  event.target.value = characters[1] + event.key
  selectTimer(document.getElementById('hours').value, document.getElementById('minutes').value, document.getElementById('seconds').value)
}

function handleCustomTimeSelectionOnMobile() {

}

/**
 * Method responsible for handling backspacing
 * in custom time editing. "event.preventDefault()" 
 * is needed here to avoid unexpected behavior.
 */
function handleBackspacePressed(event) {
  if (event.keyCode === 8) {
    event.preventDefault()
    const characters = event.target.value.split('')
    event.target.value = characters[0] === '0' ? '00' : '0' + characters[1]
    selectTimer(document.getElementById('hours').value, document.getElementById('minutes').value, document.getElementById('seconds').value)
  }
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

function goToNext() {
  const slideShow = document.getElementById('slide-show')
  const currentSlidePosition = getCurrentSlidePosition()
  const nextSlidePosition = currentSlidePosition < (slides.length - 1) ? currentSlidePosition + 1 : 0
  slideShow.scrollLeft = slides[nextSlidePosition].position
  defineCurrentSlide(slides[nextSlidePosition].position)
}

function goToLast() {
  const slideShow = document.getElementById('slide-show')
  const currentSlidePosition = getCurrentSlidePosition()
  const lastSlidePosition = currentSlidePosition > 0 ? currentSlidePosition - 1 : (slides.length - 1)
  slideShow.scrollLeft = slides[lastSlidePosition].position
  defineCurrentSlide(slides[lastSlidePosition].position)
}

function manageWindowResize() {
  if (window.matchMedia('(max-width: 52.5rem)').matches) return false

  updateSlides()
  const slideShow = document.getElementById('slide-show')
  slideShow.scrollLeft = slides[getCurrentSlidePosition()].position
}

function defineSlides() {
  const slideShow = Array.from(document.getElementsByClassName('inner-container'))
  const slideSize = slideShow[0].clientWidth + (2 * slideShow[0].offsetLeft)
  slideShow.forEach((slide, position) => {
    slides.push({
      position: slideSize * position,
      width: slideSize,
      current: false
    })
  })
}

function updateSlides() {
  const slideShow = document.getElementsByClassName('inner-container')
  const slideSize = slideShow[0].clientWidth + (2 * slideShow[0].offsetLeft)
  slides.forEach((slide, position) => {
    slides[position] = {
      ...slides[position],
      position: slideSize * position,
      width: slideSize
    }
  })
}

function defineCurrentSlide(scrollLeft = 0) {
  for (const slide of slides) {
    if (slide.position !== scrollLeft) {
      slide.current = false
    } else {
      slide.current = true
      break
    }
  }
}

function getCurrentSlidePosition() {
  for (let position = 0; position < slides.length; position++)
    if (slides[position].current)
      return position
}

function submitMessage(event) {
  event.preventDefault()
}