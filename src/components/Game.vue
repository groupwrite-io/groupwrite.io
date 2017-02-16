<template>
  <div class="game">
    <h1>Welcome {{sharedState.myNickname}}</h1>
    <form>
      <textarea rows=3 cols=50 id='mytext' placeholder="Enter your text here" v-model="suggestionText" v-on:keyup="syncText"></textarea>
    </form>
    <div id='center'>
      <player-list></player-list>
      <quit-button></quit-button>
    </div>
    <div id='right'>
      <div id='story'>
        <h1>The Story's Title</h1>
        <div id="story-html" v-html="sharedState.storyHtml"></div>
        </h2>The End</h2>
      </div>
    </div>
  </div>
</template>
<script>
  import assert from 'assert'
  import store from './store'
  import PlayerList from './PlayerList.vue'
  import QuitButton from './QuitButton'
  var request = require('superagent')

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
        // console.log(`player entered text ${this.suggestionText}`)
        console.log(this.sharedState.playerId)
        request.post('/api/suggest', {
          // TODO delete when we have session
          playerId: this.sharedState.playerId,
          suggestion: this.suggestionText
        }, function (err, state) {
          // TODO handle login failure
          assert(!err)
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
  #center {
    width: 300px;
    display: inline-block;
  }
  
  #right {
    width: 500px;
    display: inline-block;
    position: fixed;
    margin-right: 50px;
    margin-left: 50px;
  }
</style>