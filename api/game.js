var State = require('./state')
var server = require('../build/server')

module.exports = function (router) {
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
}