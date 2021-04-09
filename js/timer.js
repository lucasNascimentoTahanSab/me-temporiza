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
    if (play) this._playTimer()
    else this._pauseTimer()
  }

  handleTimerSelection(timer) {
    this._updateInitialTime(timer)
    this._updateCurrentTime()
  }

  handleTimerReload() {
    this._pauseTimer()
    this._resetHours()
    this._resetMinutes()
    this._resetSeconds()
  }

  decreaseTimer() {
    this._currentSeconds = this._currentSeconds > 0 ? this._currentSeconds - 1 : 59
    this._currentMinutes = this._currentSeconds === 59 && this._currentMinutes > 0 ? this._currentMinutes - 1 : this._currentMinutes
    this._currentHours = this._currentMinutes === 59 && this._currentHours > 0 ? this._currentHours - 1 : this._currentHours
  }

  timeIsOver() {
    return this._currentHours === 0 && this._currentMinutes === 0 && this._currentSeconds === 0
  }

  getTimeFormatted() {
    return this._formatHours() + ':' + this._formatMinutes() + ':' + this._formatSeconds()
  }

  _updateInitialTime(timer) {
    const timerElements = timer.split(':')

    this._initialHours = timerElements[0]
    this._initialMinutes = timerElements[1]
    this._initialSeconds = timerElements[2]
  }

  _updateCurrentTime() {
    this._currentHours = parseInt(this._initialHours)
    this._currentMinutes = parseInt(this._initialMinutes)
    this._currentSeconds = parseInt(this._initialSeconds)
  }

  _playTimer() {
    this._isPlaying = true
  }

  _pauseTimer() {
    this._isPlaying = false
  }

  _resetHours() {
    this._currentHours = parseInt(this._initialHours)
  }

  _resetMinutes() {
    this._currentMinutes = parseInt(this._initialMinutes)
  }

  _resetSeconds() {
    this._currentSeconds = parseInt(this._initialSeconds)
  }

  _formatHours() {
    return this._currentHours >= 10 ? this._currentHours.toString() : '0' + this._currentHours.toString()
  }

  _formatMinutes() {
    return this._currentMinutes >= 10 ? this._currentMinutes.toString() : '0' + this._currentMinutes.toString()
  }

  _formatSeconds() {
    return this._currentSeconds >= 10 ? this._currentSeconds.toString() : '0' + this._currentSeconds.toString()
  }
}