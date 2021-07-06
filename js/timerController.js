import Timer from './timer.js'

export default class TimerController {
	_timer
	_isPlaying

	constructor() {
		this._timer = new Timer()
		this._isPlaying = false;
	}

	get isPlaying() {
		return this._isPlaying
	}

	toggleTimerMode(play) {
		if (play) this._playTimer()
		else this._pauseTimer()
	}

	selectTimer(hours, minutes, seconds) {
		this._updateInitialTime(hours, minutes, seconds)
		this._resetCurrentTime()
	}

	decreaseTimer() {
		this._timer.remainingTime--
		this._timer.currentSeconds = this._timer.remainingTime % 60
		this._timer.currentMinutes = Math.floor(this._timer.remainingTime / 60) % 60
		this._timer.currentHours = Math.floor(this._timer.remainingTime / 3600) % 60
	}

	reloadTimer() {
		this._pauseTimer()
		this._resetCurrentTime()
	}

	getTimeFormatted() {
		return (
			this._formatTime(this._timer.currentHours) + ':' +
			this._formatTime(this._timer.currentMinutes) + ':' +
			this._formatTime(this._timer.currentSeconds)
		)
	}

	timeIsOver() {
		return this._timer.remainingTime === 0
	}

	_playTimer() {
		this._isPlaying = true
	}

	_pauseTimer() {
		this._isPlaying = false
	}

	_updateInitialTime(hours, minutes, seconds) {
		this._timer.initialHours = hours
		this._timer.initialMinutes = minutes
		this._timer.initialSeconds = seconds
		this._timer.remainingTime = this._getHoursInSeconds(hours) + this._getMinutesInSeconds(minutes) + seconds
	}

	_resetCurrentTime() {
		this._timer.currentHours = parseInt(this._timer.initialHours)
		this._timer.currentMinutes = parseInt(this._timer.initialMinutes)
		this._timer.currentSeconds = parseInt(this._timer.initialSeconds)
		this._timer.remainingTime =
			this._getHoursInSeconds(this._timer.currentHours) +
			this._getMinutesInSeconds(this._timer.currentMinutes) +
			this._timer.currentSeconds
	}

	_getHoursInSeconds(hours) {
		return typeof hours === 'number' ? Math.floor(hours * 3600) : 0
	}

	_getMinutesInSeconds(minutes) {
		return typeof minutes === 'number' ? Math.floor(minutes * 60) : 0
	}

	_formatTime(timeUnit) {
		return timeUnit >= 10 ? timeUnit.toString() : '0' + timeUnit.toString()
	}
}