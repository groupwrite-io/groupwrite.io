<template>
  <div class="game">
    <h1>Welcome {{sharedState.myNickname}}</h1>
    <form>
      <textarea rows=3 cols=50 id='mytext' placeholder="Enter your text here"></textarea>
    </form>
    <player-list></player-list>
    <quit-button></quit-button>
  </div>
</template>

<script>
  // import assert from 'assert'
  import store from './store'
  import PlayerList from './PlayerList.vue'
  import QuitButton from './QuitButton'

  export default {
    name: 'Game',
    components: {
      PlayerList,
      QuitButton
    },
    data() {
      return {
        sharedState: store.state
      }
    },
    mounted: function () {
      document.getElementById('mytext').focus()

      var audio = new window.Audio('./static/ding.ogg')
      audio.play()
    }
  }
</script>

<style>

</style>