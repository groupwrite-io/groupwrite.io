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
        sharedState: store.state
      }
    },
    created: function () {
      var self = this
      function updateState(state) {
        assert(state)
        console.log(`Got server state (updated num players from ${self.sharedState.length} to ${state.players.length})`)
        self.sharedState.players = state.players
      }

      // State management
      (function () {
        // Get initial state
        var request = require('superagent')
        request.get('/api/state', (err, res) => {
          assert(!err)
          assert(res.status === 200)

          updateState(res.body)
        })

        // Update on change
        socket.on('server:state', updateState)
      })()

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