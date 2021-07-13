const metemporiza = require('../metemporiza')
const http = require('http')

const port = normalizePort(process.env.PORT || '3000')
metemporiza.set('port', port)

const server = http.createServer(metemporiza)
server.listen(port)

function normalizePort(portValue) {
  const port = parseInt(portValue, 10)
  return isNaN(port) ? portValue : port >= 0 ? port : false
}