var express = require('express')
var router = express.Router()
var State = require('./state')
var server = require('./server')
var assert = require('assert')

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

// GET /clearAll
router.post('/clearAll', function (req, res, next) {
  State.clearAll()
  server.io.emit('server:state')
  res.send(true)
})

// POST /login
router.post('/login', function (req, res, next) {
  var nickname = req.body.nickname
  var id = req.body.id

  State.addPlayer({ nickname, id })

  server.io.emit('server:state')
  res.send(true)
})

// POST /quit
router.post('/quit', function (req, res, next) {
  State.removePlayer(req.body.id)
  server.io.emit('server:state')
  res.send(true)
})

module.exports = router
