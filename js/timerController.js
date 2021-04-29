import Timer from './timer.js'

export default class TimerController {
    _timer

    constructor() {
        this._timer = new Timer()
    }

    get isPlaying() {
        return this._timer.isPlaying
    }

    toggleTimerMode(play) {
        if (play) this._playTimer()
        else this._pauseTimer()
    }

    selectTimer(hours, minutes, seconds) {
        this._updateInitialTime(hours, minutes, seconds)
        this._updateCurrentTime()
    }

    reloadTimer() {
        this._pauseTimer()
        this._resetHours()
        this._resetMinutes()
        this._resetSeconds()
    }

    decreaseTimer() {
        this._timer.currentSeconds = this._timer.currentSeconds > 0 ? this._timer.currentSeconds - 1 : 59
        this._timer.currentMinutes = this._timer.currentSeconds === 59 && this._timer.currentMinutes > 0 ? this._timer.currentMinutes - 1 : this._timer.currentMinutes
        this._timer.currentHours = this._timer.currentMinutes === 59 && this._timer.currentSeconds === 59 && this._timer.currentHours > 0 ? this._timer.currentHours - 1 : this._timer.currentHours
    }

    timeIsOver() {
        return this._timer.currentHours === 0 && this._timer.currentMinutes === 0 && this._timer.currentSeconds === 0
    }

    getTimeFormatted() {
        return this._formatHours() + ':' + this._formatMinutes() + ':' + this._formatSeconds()
    }

    _updateInitialTime(hours, minutes, seconds) {
        this._timer.initialHours = hours
        this._timer.initialMinutes = minutes
        this._timer.initialSeconds = seconds
    }

    _updateCurrentTime() {
        this._timer.currentHours = parseInt(this._timer.initialHours)
        this._timer.currentMinutes = parseInt(this._timer.initialMinutes)
        this._timer.currentSeconds = parseInt(this._timer.initialSeconds)
    }

    _playTimer() {
        this._timer.isPlaying = true
    }

    _pauseTimer() {
        this._timer.isPlaying = false
    }

    _resetHours() {
        this._timer.currentHours = parseInt(this._timer.initialHours)
    }

    _resetMinutes() {
        this._timer.currentMinutes = parseInt(this._timer.initialMinutes)
    }

    _resetSeconds() {
        this._timer.currentSeconds = parseInt(this._timer.initialSeconds)
    }

    _formatHours() {
        return this._timer.currentHours >= 10 ? this._timer.currentHours.toString() : '0' + this._timer.currentHours.toString()
    }

    _formatMinutes() {
        return this._timer.currentMinutes >= 10 ? this._timer.currentMinutes.toString() : '0' + this._timer.currentMinutes.toString()
    }

    _formatSeconds() {
        return this._timer.currentSeconds >= 10 ? this._timer.currentSeconds.toString() : '0' + this._timer.currentSeconds.toString()
    }
}