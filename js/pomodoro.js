const pomodoroTitle = 'Pomodoro Timer'
const fiveMinutes = '5'
const twentyFiveMinutes = '25'
const fiftyMinutes = '50'
window.addEventListener('load', () => {
  document.getElementById('pomodoroTitle').innerHTML = pomodoroTitle
  document.getElementById('5minutes').innerHTML = fiveMinutes
  document.getElementById('25minutes').innerHTML = twentyFiveMinutes
  document.getElementById('50minutes').innerHTML = fiftyMinutes
})