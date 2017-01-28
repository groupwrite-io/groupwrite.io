<template>
  <div class='queue'>
    <h1>Waiting for players {{sharedState.players.length}}/3</h1>
    <h2>We'll play a gong when the game start (turn up your spakers)</h2>
    <button id='quit-btn' v-on:click="quit">Quit</button>
  </div>
</template>

<script>
  import store from './store'
  import PlayerList from './PlayerList.vue'

  // var VueRouter = require('vue-router')
  // var router = new VueRouter()

  export default {
    name: 'Queue',
    components: {
      PlayerList
    },
    data() {
      return {
        sharedState: store.state
      }
    }
  }
</script>