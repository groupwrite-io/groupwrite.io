<template>
  <div id="app">
    <div class="debug">
      <common></common>

      <p>
        <router-link to="/">Home</router-link>
        <router-link to="/game">Game</router-link>
        <router-link to="/admin">Admin</router-link>
      </p>
    </div>
    <router-view :players="players"></router-view>
  </div>
</template>

<script>
  import Common from './components/Common'
  import Game from './components/game'

  var socketlib = require('socket.io-client')
  var socket = socketlib('http://localhost:3000/')

  export default {
    name: 'app',
    components: {
      Common,
      Game
    },
    data: function () {
      return {
        players: []
      }
    },
    created: function () {
      var self = this
      socket.on('server:state', function (state) {
        console.log(`Got server state (updated num players from ${self.players.length} to ${state.players.length})`)
        self.players = state.players
      })
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