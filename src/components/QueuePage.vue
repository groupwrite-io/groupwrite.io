<template>
  <div class='queue center'>
    <h1>{{sharedState.myNickname}}</h1>
    <h1 class="waiting">Waiting for players {{sharedState.players.length}}/{{consts.maxPlayers}}...</h1>
    <h2>A gong will play when the game starts (turn up your speakers)</h2>
    <div id="stories-link">
      While you wait, check out our <a href='/#/stories' target="blank">completed stories</a>
    </div>
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