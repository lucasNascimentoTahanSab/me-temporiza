const express = require('express');
const path = require('path');

const router = express.Router()
const metemporiza = express()

metemporiza.set('views', './views')
metemporiza.set('view engine', 'html')

router.get('/', (req, res) => res.sendFile(path.join(__dirname + '/views/index.html')))
router.get('/signin', (req, res) => res.sendFile(path.join(__dirname + '/views/signin.html')))
router.get('/signup', (req, res) => res.sendFile(path.join(__dirname + '/views/signup.html')))

metemporiza.use('/', router)
metemporiza.use(express.static(__dirname))

module.exports = metemporiza
