window.addEventListener('load', () => {
  document.getElementById('login').addEventListener('click', submitMessage)
})

function submitMessage(e) {
  e.preventDefault()
}