<template>
  <div id="app">
    <div class="debug">
      <common></common>

      <p>
        <router-link to="/">Home</router-link>
        <router-link to="/queue">Queue</router-link>
        <router-link to="/game">Game</router-link>
        <router-link to="/admin">Admin</router-link>
      </p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Common from './components/Common'
  import store from './components/store'
  import assert from 'assert'

  var request = require('superagent')
  var socketlib = require('socket.io-client')
  var socket = socketlib('http://localhost:3000/')
  var VueRouter = require('vue-router')
  var router = new VueRouter()

  export default {
    name: 'app',
    components: {
      Common
    },
    data: function () {
      return {
        sharedState: store.state,
        consts: store.consts
      }
    },
    created: function () {
      var self = this

      // Update on change
      socket.on('server:state', function () {
        request.get('/api/state', { playerId: self.sharedState.playerId }, (err, res) => {
          assert(!err)
          assert(res.status === 200)

          let state = res.body
          assert(state)

          console.log(`Got server state (updated num players from ${self.sharedState.players.length} to ${state.players.length})`)
          self.sharedState.players = state.players

          assert(state.players.length <= self.consts.maxPlayers)
          // TODO Read current location from VueRouter here. router.history.current shows '/' for some reason
          if (state.players.length === self.consts.maxPlayers && window.location.hash.endsWith('/queue')) {
            router.replace('/game')
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
  background-color:lightgray
}
a {
  margin-right: 10px;
}
</style>