var express = require('express')
var router = express.Router()
var assert = require('assert')
var session = require('express-session')
var secret = require('../config/secret.config')

var State = require('./state')
const pjson = require('../package.json');


// Routes
require('./stories')(router)
require('./users')(router)
require('./game')(router)
require('./admin')(router)

// GET /
router.get('/', function (req, res, next) {
  res.send('groupwrite.io API server')
})

// GET /version
router.get('/version', function (req, res, next) {
  res.send(pjson.version)
})

module.exports = router

