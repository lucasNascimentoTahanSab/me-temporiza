import Email from "./email.js";

export default class EmailController {
  _email

  constructor() {
    this._email = new Email
  }

  set name(name) {
    if (typeof name !== 'string') return

    this._email.name = name
  }

  set origin(origin) {
    if (typeof origin !== 'string') return

    this._email.origin = origin
  }

  set title(title) {
    if (typeof title !== 'string') return

    this._email.title = title
  }

  set message(message) {
    if (typeof message !== 'string') return

    this._email.message = message
  }

  sendEmail() { }
}