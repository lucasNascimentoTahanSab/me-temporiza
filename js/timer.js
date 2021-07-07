export default class Timer {
  initialHours
  initialMinutes
  initialSeconds
  currentHours
  currentMinutes
  currentSeconds
  finalTime

  constructor() {
    this.initialHours = '00'
    this.initialMinutes = '00'
    this.initialSeconds = '00'
    this.currentHours = parseInt(this.initialHours)
    this.currentMinutes = parseInt(this.initialMinutes)
    this.currentSeconds = parseInt(this.initialSeconds)
    this.finalTime = new Date
  }
}