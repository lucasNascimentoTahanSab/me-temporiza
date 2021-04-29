import { selectTimer } from './index.js'

(() => {
    setUpEvents()
})()

window.addEventListener('click', formatTimeInputs)

function setUpEvents() {
    $('#hours').change(handleCustomTimeSelection)
    $('#minutes').change(handleCustomTimeSelection)
    $('#seconds').change(handleCustomTimeSelection)
}

function formatTimeInputs(event) {
    if (event.target.id === 'hours' || event.target.id === 'minutes' || event.target.id === 'seconds') return

    const timeInputs = document.querySelectorAll('[data-id="timeInput"]')
    timeInputs.forEach(timeInput => {
        if (timeInput.value.length === 2) return
        timeInput.value = '0' + timeInput.value
    })
}

function handleCustomTimeSelection() {
    selectTimer(document.getElementById('hours').value, document.getElementById('minutes').value, document.getElementById('seconds').value)
}