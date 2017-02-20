<template>
  <div id="app">
    <div class="debug" v-if="isAdmin">
      <h1>debug toolbar</h1>
      <p>
        <router-link to="/">Home</router-link>
        <router-link to="/queue">Queue</router-link>
        <router-link to="/game">Game</router-link>
        <router-link to="/admin">Admin</router-link>
        <router-link to="/gameover">Game Over</router-link>
      </p>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import store from './components/store'
  import assert from 'assert'

  var request = require('superagent')
  var socketlib = require('socket.io-client')
  var socket = socketlib()
  var VueRouter = require('vue-router')
  var router = new VueRouter()

  function getAdminKey() {
    return window.localStorage.getItem('writeio-admin-key')
  }

  function isAdmin() {
    return !!getAdminKey()
  }

  export default {
    name: 'app',
    components: {
      // Add any custom components here
    },
    data: function () {
      return {
        sharedState: store.state,
        consts: store.consts,
        isAdmin: isAdmin()
      }
    },
    created: function () {
      var self = this

      function updateStateForPlayer(playerId, callback) {
        return request.get('/api/user/state')
          .set('Accept', 'application/json')
          .query({
            playerId
          })
          .end((err, res) => {
            if (err) {
              window.alert(`Error updating state: ${err}`)
              return
            }

            assert(res.status === 200)
            let state = res.body
            assert(state)

            console.log(
              `Got server state (updated num players from ${self.sharedState.players.length} to ${state.players.length})`
            )
            self.sharedState.players = state.players
            if (state.game) {
              self.sharedState.story = state.game.story
            }

            // Populate iVotedFor boolean
            let myPlayer = self.sharedState.players.find(player => player.id === self.sharedState.playerId)
            if (myPlayer) {
              self.sharedState.players = self.sharedState.players.map(player => {
                player.iVotedFor = (player.id === myPlayer.votedForId)
                return player
              })
            }

            assert(state.players.length <= self.consts.maxPlayers)
            // Read current location from VueRouter here. router.history.current shows '/' for some reason
            // https://github.com/groupwrite-io/groupwrite.io/issues/56
            if (state.players.length === self.consts.maxPlayers && window.location.hash.endsWith('/queue')) {
              router.replace('/game')
            }

            if (callback) {
              callback()
            }
          })
      }

      function updateAdminState(callback) {
        let adminKey = getAdminKey()
        if (!adminKey) {
          return
        }

        return request.get('/api/adminState')
          .set('Accept', 'application/json').query({
            adminKey
          }).end((err, res) => {
            assert(!err)
            assert(res.status === 200)
            self.sharedState.adminState = res.body
            if (callback) {
              callback()
            }
          })
      }

      // Returns future
      function updateState(callback) {
        // We only ask for state if we're logged in or admin
        if (self.sharedState.playerId) {
          return updateStateForPlayer(self.sharedState.playerId, callback)
        } else {
          return updateAdminState(callback)
        }
      }

      updateState()

      // Update on change when server state changes
      socket.on('server:state', function () {
        updateState()
      })
      socket.on('server:round-over', function () {
        updateState(() => {
          console.log('Round over')
          // If I won the last round, clear my suggestion box
          assert(self.sharedState.story)
          assert(self.sharedState.story.contributions.length > 0)
          var lastRound = self.sharedState.story.contributions[self.sharedState.story.contributions.length - 1]

          if (lastRound.text === 'The End') {
            console.log('--- Game over ---')
            router.replace('/gameover')
            return
          }

          if (lastRound.playerId === self.sharedState.playerId) {
            console.log('I won last round!')
            // Clear my suggestion
            self.sharedState.suggestionText = ''

            // Let's play some animation here
            // https://github.com/groupwrite-io/groupwrite.io/issues/57
          }
        })
      })

      // Routes
      // If we're not on the admin page, reload --> home
      if (!window.location.href.endsWith('admin')) {
        router.replace('/')
      }
    }
  }

</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  .debug {
    background-color: lightgray
  }
  
  a {
    margin-right: 10px;
  }
  
  .center {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    position: absolute;
  }
</style>