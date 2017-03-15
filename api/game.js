const assert = require('assert')
const _ = require('underscore')
var bunyan = require('bunyan')
var log = bunyan.createLogger({name: "groupwrite.io"})

const State = require('./state')
const server = require('../build/server')
const Story = require('./model/story')


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

    if (State.updateTitle(player)) {
      server.io.emit('server:title-round-over')
    } else if (State.updateStory(player)) {
      let game = State.findGameByPlayerId(player.id)
      assert(game)
      if (_.last(game.story.contributions).text === 'The End') {
        log.info(`Game finished, saving story with players ${game.players}`)
        let story = new Story({ contributions: game.story.contributions, title: game.story.title, players: game.players })
        story.save().then(() => {
          game.story.id = story._id
          // TODO - convert this to 'server:game-over' instead of detecting on client
          server.io.emit('server:round-over')
        })
      } else {
        server.io.emit('server:round-over')
      }
    } else {
      server.io.emit('server:state')
    }
    res.send(true)
  })
}