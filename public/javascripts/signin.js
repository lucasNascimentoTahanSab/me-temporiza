import urlRequest from './urlRequest.js'

window.addEventListener('load', () => {
  document.getElementById('home-page-desktop').addEventListener('click', urlRequest.goToHomePage)
  document.getElementById('home-page-mobile').addEventListener('click', urlRequest.goToHomePage)
  document.getElementById('signup').addEventListener('click', urlRequest.goToSignUpPage)
  document.getElementById('signin').addEventListener('click', submitMessage)
})

function submitMessage(e) {
  e.preventDefault()
}