<template>
  <div class="game">
    <h1>Welcome {{sharedState.myNickname}}</h1>
    <p> {{suggestionText}}</p>
    <form>
      <textarea rows=3 cols=50 id='mytext' placeholder="Enter your text here" v-model="suggestionText" v-on:keydown="syncText"></textarea>
      <!-- <textarea rows=3 cols=50 id='mytext' placeholder="Enter your text here" v-model="suggestionText"></textarea>-->
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
        sharedState: store.state,
        suggestionText: ''
      }
    },
    methods: {
      syncText: function () {
        console.log(`player entered text`)
        var request = require('superagent')
        console.log(this.sharedState.playerId)
        request.post('/api/suggest', {
          // TODO delete when we have session
          id: this.sharedState.playerId,
          suggestion: this.suggestionText
        }, function (err, state) {
          // TODO handle login failure
          if (err) {
            console.log(err)
          }
        })
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