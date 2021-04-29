import { selectTimer } from './index.js'

(function setUpDefinitions() {
    setUpEvents()
})()

function setUpEvents() {
    $('#hours').change(handleCustomTimeSelection)
    $('#minutes').change(handleCustomTimeSelection)
    $('#seconds').change(handleCustomTimeSelection)
}

function handleCustomTimeSelection() {
    selectTimer(document.getElementById('hours').value, document.getElementById('minutes').value, document.getElementById('seconds').value)
}