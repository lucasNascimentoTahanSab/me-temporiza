import Timer from './timer.js'

let timerFormatted
const oneSecond = 1000
const timer = new Timer()
const slides = []
window.addEventListener('load', () => {
  defineSlides()
  defineCurrentSlide(0)
  changeTimerValueOnScreen()
  document.getElementById('5minutes').addEventListener('click', event => selectTimer(event))
  document.getElementById('25minutes').addEventListener('click', event => selectTimer(event))
  document.getElementById('50minutes').addEventListener('click', event => selectTimer(event))
  document.getElementById('execute-button').addEventListener('click', () => executeTimer())
  document.getElementById('reload-button').addEventListener('click', () => reloadTimer())
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
  document.getElementById('submit-message').addEventListener('click', event => submitMessage(event))
  startTimer()
})

window.addEventListener('resize', () => {
  manageWindowResize()
})

function startTimer() {
  setInterval(() => {
    if (timer.isPlaying) {
      timer.decreaseTimer()
      changeTimerValueOnScreen()
      if (timer.timeIsOver()) {
        timer.reloadTimer()
        playAlarm()
      }
    }
  }, oneSecond)
}

function executeTimer() {
  if (timer.isPlaying) timer.executeTimer(false)
  else timer.executeTimer(true)
  changeExecuteImage()
}

function selectTimer(event) {
  timer.selectTimer(event.target.dataset.time)

  changeTimerValueOnScreen()
  updatePresetTimes()
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
  timer.reloadTimer()
  changeTimerValueOnScreen()
  changeExecuteImage()
}

function changeTimerValueOnScreen() {
  timerFormatted = timer.getTimeFormatted()
  document.getElementById('timer-formatted').innerHTML = timerFormatted
}

function changeExecuteImage() {
  document.getElementById('execute-button').src = timer.isPlaying ? 'src/pause.png' : 'src/play.png'
}

function playAlarm() {
  document.getElementById('alarm').play()
}

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

function defineCurrentSlide(scrollLeft) {
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
  event.preventDefault();
}