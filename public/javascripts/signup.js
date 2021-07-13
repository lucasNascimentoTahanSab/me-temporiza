import urlRequest from './urlRequest.js'

window.addEventListener('load', () => {
  document.getElementById('home-page-desktop').addEventListener('click', urlRequest.goToHomePage)
  document.getElementById('home-page-mobile').addEventListener('click', urlRequest.goToHomePage)
  document.getElementById('signin').addEventListener('click', urlRequest.goToSignInPage)
  document.getElementById('signup').addEventListener('click', submitMessage)
})

function submitMessage(e) {
  e.preventDefault()
}