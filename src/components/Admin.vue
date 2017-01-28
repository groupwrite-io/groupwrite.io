<template>
  <div id="admin">
    <h1>Ongoing Games</h1>
    <ol>
      <li v-for="game in sharedState.adminState.games">
        Game: {{game.playerIds.map( (id) => sharedState.adminState.players[id].nickname) }}
      </li>
    </ol>
    <h1>Queue</h1>
    <ol>
      <li v-for="playerId in sharedState.adminState.queue">
        {{sharedState.adminState.players[playerId].nickname}}
      </li>
    </ol>
    <div id="admin-page">
      <button v-on:click="clearAll">Clear All !</button>
    </div>
  </div>
</template>

<script>
  import PlayerList from './PlayerList.vue'
  import store from './store'
  import assert from 'assert'

  export default {
    name: 'Admin',
    components: {
      PlayerList
    },
    data: function () {
      return {
        sharedState: store.state
      }
    },
    methods: {
      clearAll: function () {
        var request = require('superagent')
        request.post('/api/clearAll', function (err, result) {
          assert(!err)
          assert(result.status === 200)
          window.alert('Cleared!')
        })
      }
    }

  }
</script>