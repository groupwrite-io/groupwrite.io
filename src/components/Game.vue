<template>
  <div class="game">

    <div class='container'>
      <h1>Welcome {{sharedState.myNickname}}</h1>
      <div class='row'>
        <div class='col-md-6'>
          <form>
            <textarea rows=5 cols=55 id='mytext' placeholder="Enter your text here" v-model="sharedState.suggestionText" v-on:keyup="syncText"
              spellcheck='true'></textarea>
          </form>
          <player-list></player-list>
          <quit-button></quit-button>
        </div>
        <div class='col-md-2'>
        </div>
        <div class='col-md-4'>
          <div id='story'>
            <h1>The Story's Title</h1>
            <div id="story-html" v-html="sharedState.storyHtml"></div>
            <h2 class='theend'>The End</h2>
          </div>
        </div>
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
        sharedState: store.state
      }
    },
    methods: {
      syncText: function () {
        // console.log(`player entered text ${this.suggestionText}`)
        console.log(this.sharedState.playerId)
        request.post('/api/suggest', {
          // TODO delete when we have session
          playerId: this.sharedState.playerId,
          suggestion: this.sharedState.suggestionText
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
  #mytext {
    padding: 5px;
  }
  
  #story {
    border: 3px black double;
    padding: 5px;
    border-radius: 15px;
  }
  
  #story-html {
    text-align: left;
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
  }
  
  #story h1 {
    margin-bottom: 20px
  }
  
  #story h2 {
    margin-top: 20px
  }
</style>