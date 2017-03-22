var State = require('./state')
var server = require('../build/server')
var bunyan = require('bunyan')
var log = require('../util/logger').getLogger()

module.exports = function (router) {
  // POST /user/login
  router.post('/user/login', function (req, res, next) {

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
    log.info(`/user/login Saved playerId ${playerId} on session ${req.session.id}`)
    State.addPlayer({
      id: playerId,
      nickname
    })

    server.io.emit('server:state')

    res.send(true)
  })

  // POST /user/quit
  router.post('/user/quit', function (req, res, next) {
    State.removePlayer(req.body.playerId)
    server.io.emit('server:state')

    var session = req.session
    session.destroy()
    res.send(true)
  })

  // GET /state
  router.get('/user/state', function (req, res, next) {
    if (!req.query.playerId) {
      res.status(500).send('Missing playerId')
      return
    }
    var state = State.getStateByPlayerId(req.query.playerId)
    res.json(state)
  })
}