var uuid = require('uuid/v4')
var values = require('object.values');
var config = require('../config/server.config');

var State = {}

State.clearAll = function () {
  State.players = {}
  State.queue = []
  State.games = {}
}

State.gameToStr = function (game) {
  var result = `${game.id}: `
  for (var playerId of game.playerIds) {
    result += playerId
  }
  return result;
}

State.addPlayer = function (player) {
  State.players[player.id] = player
  State.queue.push(player.id)

  // Create new game if needed
  if (State.queue.length === config.MAX_PLAYERS_IN_GAME) {
    var id = uuid()
    var game = {
      startTime: Date.now(),
      id,
      playerIds: State.queue,
      story: []
    }
    State.games[game.id] = game
    console.log(`Created game ${State.gameToStr(game)}`)

    // Clear queue
    State.queue = []
  }

  console.log(`Player logged in: Added ${player.nickname}, ${player.id} to player array of length ${State.players.length}`)
}

State.removePlayer = function (playerId) {
  if (!State.players[playerId]) {
    console.log(config.noPlayerFoundMessage(playerId))
    return
  }

  var player = State.players[playerId]
  delete State[playerId]

  State.queue = State.queue.filter((qPlayerId) => qPlayerId !== playerId)
  console.log(`Player quit: ${player.nickname}, ${player.id}`)
}

State.getPlayerById = function (playerId) {
  if (!State.players[playerId]) {
    console.log(config.noPlayerFoundMessage(playerId))
    return
  }

  return State.players[playerId]
}

// Returns the state as seen by a particular player
State.getStateByPlayerId = function (playerId) {
  let filteredState = {}

  // Find current game for the player
  let game =
    values(State.games).find((g) => g.playerIds.includes(playerId))

  let players
  if (game) {
    // Either you're in a game
    players = values(State.players).filter(p => game.playerIds.includes(p.id))
    return {
      game,
      players
    }
  } else {
    // Or in the queue
    players = values(State.players).filter(p => State.queue.includes(p.id))
    return {
      queue: State.queue,
      players
    }
  }
}

State.getAdminState = function () {
  return {
    games: State.games,
    players: State.players,
    queue: State.queue
  }
}

State.getPlayerById = function (playerId) {
  if (!State.players[playerId]) {
    console.log(config.noPlayerFoundMessage(playerId))
    return null
  }
  return State.players[playerId]
}

State.findRoundWinner = function (game) {
  let votesForPlayer = {}
  let targetVotes = Math.floor(config.MAX_PLAYERS_IN_GAME / 2) + 1

  // Tally votes
  for (let playerId of game.playerIds) {
    let player = State.players[playerId]
    if (player.votedForId) {
      if (votesForPlayer[player.votedForId]) {
        votesForPlayer[player.votedForId]++
        if (votesForPlayer[player.votedForId] >= targetVotes) {
          return State.players[player.votedForId]
        }
      } else {
        votesForPlayer[player.votedForId] = 1
      }
    }
  }

  return null
}

State.findGameByPlayerId = function (playerId) {
  for (let gameId in State.games) {
    let game = State.games[gameId]
    if (game.playerIds.includes(playerId)) {
      return game
    }
  }

  return null
}

/**
 * Update the current story by votes (and in the future, check if a player has finalized their suggestion)
 */
State.updateStory = function (player) {
  let game = State.findGameByPlayerId(player.id)
  if (!game) {
    console.log(`No current game for player ${player.Id}`)
    return false
  }

  // Check if a player has majority vote
  let roundWinner = State.findRoundWinner(game);
  if (!roundWinner) {
    return false
  }

  console.log(`Round over in game ${game.id}, winner=${roundWinner.id}. Appending to ongoing story: ${roundWinner.suggestion}`)
  let contribution = {
    playerId: roundWinner.id,
    text: roundWinner.suggestion
  }
  game.story.push(contribution)

  // Clear votes
  for (let playerId of game.playerIds) {
    State.players[playerId].votedForId = null
  }

  // Clear winner's suggestion
  State.players[roundWinner.id].suggestion = ''
  return true
}

State.clearAll()

module.exports = State;
