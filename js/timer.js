export default class Timer {
  _initialHours
  _initialMinutes
  _initialSeconds
  _currentHours
  _currentMinutes
  _currentSeconds
  _isPlaying

  constructor() {
    this._initialHours = '00'
    this._initialMinutes = '05'
    this._initialSeconds = '00'
    this._currentHours = parseInt(this._initialHours)
    this._currentMinutes = parseInt(this._initialMinutes)
    this._currentSeconds = parseInt(this._initialSeconds)
    this._isPlaying = false
  }

  get isPlaying() {
    return this._isPlaying
  }

  handleTimerExecution(play) {
    if (play) this.playTimer()
    else this.pauseTimer()
  }

  handleTimerSelection(timer) {
    this.updateInitialTime(timer)
    this.updateCurrentTime()
  }

  decreaseTimer() {
    this._currentSeconds = this._currentSeconds > 0 ? this._currentSeconds - 1 : 59
    this._currentMinutes = this._currentSeconds === 59 && this._currentMinutes > 0 ? this._currentMinutes - 1 : this._currentMinutes
    this._currentHours = this._currentMinutes === 59 && this._currentHours > 0 ? this._currentHours - 1 : this._currentHours
  }

  timeIsOver() {
    return this._currentHours === 0 && this._currentMinutes === 0 && this._currentSeconds === 0
  }

  handleTimerReload() {
    this.pauseTimer()
    this.resetHours()
    this.resetMinutes()
    this.resetSeconds()
  }

  playTimer() {
    this._isPlaying = true
  }

  pauseTimer() {
    this._isPlaying = false
  }

  resetHours() {
    this._currentHours = parseInt(this._initialHours)
  }

  resetMinutes() {
    this._currentMinutes = parseInt(this._initialMinutes)
  }

  resetSeconds() {
    this._currentSeconds = parseInt(this._initialSeconds)
  }

  getTimeFormatted() {
    return this.formatHours() + ':' + this.formatMinutes() + ':' + this.formatSeconds()
  }

  formatHours() {
    return this._currentHours >= 10 ? this._currentHours.toString() : '0' + this._currentHours.toString()
  }

  formatMinutes() {
    return this._currentMinutes >= 10 ? this._currentMinutes.toString() : '0' + this._currentMinutes.toString()
  }

  formatSeconds() {
    return this._currentSeconds >= 10 ? this._currentSeconds.toString() : '0' + this._currentSeconds.toString()
  }

  timeIsOver() {
    return this._currentHours === 0 && this._currentMinutes === 0 && this._currentSeconds === 0
  }

  updateInitialTime(timer) {
    const timerElements = timer.split(':')

    this._initialHours = timerElements[0]
    this._initialMinutes = timerElements[1]
    this._initialSeconds = timerElements[2]
  }

  updateCurrentTime() {
    this._currentHours = parseInt(this._initialHours)
    this._currentMinutes = parseInt(this._initialMinutes)
    this._currentSeconds = parseInt(this._initialSeconds)
  }
}