window.addEventListener('load', () => {
  document.getElementById('subscribe').addEventListener('click', submitMessage)
})

function submitMessage(e) {
  e.preventDefault()
}