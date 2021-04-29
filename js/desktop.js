import { selectTimer } from './index.js'

const slides = [];

(function setUpDefinitions() {
    setUpEvents()
    defineSlides()
    defineCurrentSlide()
})()

window.addEventListener('resize', manageWindowResize)

function setUpEvents() {
    document.getElementById('left-last').addEventListener('click', goToLast)
    document.getElementById('right-second').addEventListener('click', goToNext)
    document.getElementById('left-home').addEventListener('click', goToLast)
    document.getElementById('right-third').addEventListener('click', goToNext)
    document.getElementById('left-second').addEventListener('click', goToLast)
    document.getElementById('right-fourth').addEventListener('click', goToNext)
    document.getElementById('left-third').addEventListener('click', goToLast)
    document.getElementById('right-last').addEventListener('click', goToNext)
    document.getElementById('left-fourth').addEventListener('click', goToLast)
    document.getElementById('right-home').addEventListener('click', goToNext)
    $('#hours').keypress(handleCustomTimeSelection)
    $('#minutes').keypress(handleCustomTimeSelection)
    $('#seconds').keypress(handleCustomTimeSelection)
    $('#hours').keydown(handleBackspacePressed)
    $('#minutes').keydown(handleBackspacePressed)
    $('#seconds').keydown(handleBackspacePressed)
}

function handleCustomTimeSelection(event) {
    if (event.key < '0' || event.key > '9') return false

    const characters = event.target.value.split('')
    event.target.value = characters[1] + event.key
    selectTimer(document.getElementById('hours').value, document.getElementById('minutes').value, document.getElementById('seconds').value)
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

function manageWindowResize() {
    if (window.matchMedia('(max-width: 52.5rem)').matches) return false

    updateSlides()
    const slideShow = document.getElementById('slide-show')
    slideShow.scrollLeft = slides[getCurrentSlidePosition()].position
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

function getCurrentSlidePosition() {
    for (let position = 0; position < slides.length; position++)
        if (slides[position].current)
            return position
}