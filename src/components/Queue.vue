<template>
  <div class='queue'>
    <h1 class="waiting">[{{sharedState.myNickname}}] Waiting for players {{sharedState.players.length}}/{{consts.maxPlayers}}</h1>
    <h2>We'll play a gong when the game start (turn up your spakers)</h2>
    <quit-button></quit-button>
  </div>
</template>

<script>
  import store from './store'
  import PlayerList from './PlayerList.vue'
  import QuitButton from './QuitButton'

  var VueRouter = require('vue-router')
  var router = new VueRouter()

  export default {
    name: 'Queue',
    components: {
      PlayerList,
      QuitButton
    },
    data() {
      return {
        sharedState: store.state,
        consts: store.consts
      }
    },
    mounted: function () {
      if (this.sharedState.players.length === this.consts.maxPlayers) {
        router.replace('/game')
      }
    }
  }
</script>