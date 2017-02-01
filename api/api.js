var express = require('express')
var router = express.Router()
var State = require('./state')
var server = require('./server')
var assert = require('assert')
var session = require('express-session')

// GET /state
router.get('/', function (req, res, next) {
  res.send('write.io API server')
})

// GET /state
router.get('/state', function (req, res, next) {
  if (!req.query.playerId) {
    res.status(500).send('Missing playerId')
    return
  }
  var state = State.getStateByPlayerId(req.query.playerId)
  res.json(state)
})

// GET & POST /error (for testing)
router.get('/error', function () {
  assert.fail('This returns a 500 error')
})
router.post('/error', function () {
  assert.fail('This returns a 500 error')
})

// POST /login
router.post('/login', function (req, res, next) {
  var nickname = req.body.nickname
  var playerId = req.body.playerId

  // if (req.session.playerId) {
  //   res.status(401).send("Are you already using this account? If you got this in error, email help@write.io")
  //   return
  // }
  req.session.playerId = req.body.playerId
  State.addPlayer({ id: playerId, nickname })

  server.io.emit('server:state')
  res.send(true)
})

// POST /quit
router.post('/quit', function (req, res, next) {
  State.removePlayer(req.body.playerId)
  server.io.emit('server:state')
  res.send(true)
})

/////// Admin //////

var adminKey = 'nalkFaoKsjd78' // TODO move this to somewhere secret & change the value (e.g. use git-secret)

// GET /adminState
router.get('/adminState', function (req, res, next) {
  if (adminKey !== req.query.adminKey) {
    res.status(401).send('Trying to access admin functions without proper key')
    return
  }

  res.send(State.getAdminState())
})

// POST /clearAll
router.post('/clearAll', function (req, res, next) {
  // TODO - only admin should be able to do this (see above)
  State.clearAll()
  server.io.emit('server:state')
  res.send(true)
})



module.exports = router
