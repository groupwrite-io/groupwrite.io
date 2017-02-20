var express = require('express')
var router = express.Router()
var assert = require('assert')
var session = require('express-session')
var secret = require('../config/secret.config')

var State = require('./state')

// Routes
require('./stories')(router)
require('./users')(router)
require('./game')(router)
require('./admin')(router)

// GET /state
router.get('/', function (req, res, next) {
  res.send('groupwrite.io API server')
})

module.exports = router

