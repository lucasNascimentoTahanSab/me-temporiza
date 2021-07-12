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

	reloadTimer() {
		this._pauseTimer()
		this._resetCurrentTime()
	}

	selectTimer(hours, minutes, seconds) {
		this._updateInitialTime(hours, minutes, seconds)
		this._resetCurrentTime()
	}

	updateTimer() {
		const newTime = this._timer.finalTime - Date.now()
		this._timer.currentHours = this._getMillisecondsInHours(newTime)
		this._timer.currentMinutes = this._getMillisecondsInMinutes(newTime)
		this._timer.currentSeconds = this._getMillisecondsInSeconds(newTime)
	}

	getTimeFormatted() {
		return (
			this._formatTime(this._timer.currentHours) + ':' +
			this._formatTime(this._timer.currentMinutes) + ':' +
			this._formatTime(this._timer.currentSeconds)
		)
	}

	timeIsOver() {
		return this._timer.finalTime <= Date.now()
	}

	_playTimer() {
		this._isPlaying = true
		this._timer.finalTime = new Date(
			Date.now() +
			this._getHoursInMilliseconds(this._timer.currentHours) +
			this._getMinutesInMilliseconds(this._timer.currentMinutes) +
			this._getSecondsInMilliseconds(this._timer.currentSeconds)
		)
	}

	_pauseTimer() {
		this._isPlaying = false
	}

	_updateInitialTime(hours, minutes, seconds) {
		this._timer.initialHours = hours
		this._timer.initialMinutes = minutes
		this._timer.initialSeconds = seconds
	}

	_resetCurrentTime() {
		this._timer.currentHours = parseInt(this._timer.initialHours)
		this._timer.currentMinutes = parseInt(this._timer.initialMinutes)
		this._timer.currentSeconds = parseInt(this._timer.initialSeconds)
	}

	_getHoursInMilliseconds(hours) {
		return typeof hours === 'number' ? this._getMinutesInMilliseconds(hours * 60) : 0
	}

	_getMinutesInMilliseconds(minutes) {
		return typeof minutes === 'number' ? this._getSecondsInMilliseconds(minutes * 60) : 0
	}

	_getSecondsInMilliseconds(seconds) {
		return typeof seconds === 'number' ? Math.floor(seconds * 1000) : 0
	}

	_getMillisecondsInHours(milliseconds) {
		return typeof milliseconds === 'number' ? Math.floor(milliseconds / 1000 / 60 / 60) : 0
	}

	_getMillisecondsInMinutes(milliseconds) {
		return typeof milliseconds === 'number' ? Math.floor(milliseconds / 1000 / 60) : 0
	}

	_getMillisecondsInSeconds(milliseconds) {
		return typeof milliseconds === 'number' ? Math.ceil(milliseconds / 1000) % 60 : 0
	}

	_formatTime(timeUnit) {
		return timeUnit >= 10 ? timeUnit.toString() : '0' + timeUnit.toString()
	}
}