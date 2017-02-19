var express = require('express')
var router = express.Router()
var State = require('./state')
var server = require('../build/server')
var assert = require('assert')
var session = require('express-session')
var secret = require('../config/secret.config')

// GET /state
router.get('/', function (req, res, next) {
  res.send('groupwrite.io API server')
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

router.get('/checkLoggedin', function (req, res, next) {
  var result
  var playerId = req.session.playerId
  if (!playerId) {
    res.json({
      loggedIn: false
    })
    return
  }

  var player = State.getPlayerById(playerId)
  if (!player) {
    res.json({
      loggedIn: false,
      playerId
    })
    return;
  }
  res.json({
    loggedIn: true,
    playerId,
    nickname: player.nickname
  })
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

  if (!nickname) {
    res.status(401).send("You must choose a nickname")
    return
  }
  if (!playerId) {
    res.status(401).send("You must choose a playerId")
    return
  }
  // if (req.session.playerId) {
  //   res.status(401).send("Are you already using this account? If you got this in error, email help@groupwrite.io")
  //   return
  // }
  req.session.playerId = playerId
  console.log(`/login Saved playerId ${playerId} on session ${req.session.id}`)
  State.addPlayer({
    id: playerId,
    nickname
  })

  server.io.emit('server:state')

  res.send(true)
})

// POST /quit
router.post('/quit', function (req, res, next) {
  State.removePlayer(req.body.playerId)
  server.io.emit('server:state')

  var session = req.session
  session.destroy()
  res.send(true)
})

// POST /suggest
router.post('/suggest', function (req, res, next) {
  var playerId = req.body.playerId
  var suggestion = req.body.suggestion
  if (!playerId) {
    res.status(422).send("Missing playerId")
    return
  }
  var player = State.getPlayerById(playerId)
  if (player == null) {
    res.status(422).send(`Missing player for playerId ${playerId}`)
    return
  }
  player.suggestion = suggestion
  server.io.emit('server:state')
  res.send(true)
})

// POST /removeVote
router.post('/removevote', function (req, res, next) {
  var voterId = req.body.voterId
  if (!voterId) {
    res.status(422).send("Missing voterId or votedForId")
    return
  }
  var player = State.getPlayerById(voterId)
  if (player == null) {
    res.status(422).send(`Missing player for playerId ${playerId}`)
    return
  }

  player.votedForId = null
  server.io.emit('server:state')
  res.send(true)
})

// POST /vote
router.post('/vote', function (req, res, next) {
  var voterId = req.body.voterId
  var votedForId = req.body.votedForId
  if (!voterId || !votedForId) {
    res.status(422).send("Missing voterId or votedForId")
    return
  }
  var player = State.getPlayerById(voterId)
  if (player == null) {
    res.status(422).send(`Missing player for playerId ${playerId}`)
    return
  }

  // This is information only the server should see
  // (Players do not see who other players vote for)
  // Currently they get the entire server state.
  // Someone could write a modified client that displays votes
  // https://github.com/groupwrite-io/groupwrite.io/issues/53
  player.votedForId = votedForId

  if (State.updateStory(player)) {
    server.io.emit('server:round-over')
  } else {
    server.io.emit('server:state')
  }
  res.send(true)
})

/////// Admin //////

// GET /adminState
router.get('/adminState', function (req, res, next) {
  if (secret.adminKey !== req.query.adminKey) {
    res.status(401).send('Trying to access admin functions without proper key')
    return
  }

  res.send(State.getAdminState())
})

// POST /clearAll
router.post('/clearAll', function (req, res, next) {
  // Only admin should be able to do this /adminState above
  // https://github.com/groupwrite-io/groupwrite.io/issues/55
  State.clearAll()
  server.io.emit('server:state')
  res.send(true)
})

module.exports = router
