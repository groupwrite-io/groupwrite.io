<template>
  <div class="game">

    <div class='container'>
      <h1>Welcome {{sharedState.myNickname}}</h1>
      <div class='row'>
        <div class='col-md-1'>
          <div class='row'>
            <button class='action-btn' title='You finished typing, send in your suggestion'>Send</button>
          </div>
          <div class='row'>
            <button class='action-btn' title='Propose an ending to the story' v-on:click='theend'>The End</button>
          </div>
        </div>
        <div class='col-md-5'>
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
            <div id="story-html">
              <div v-for="contribution in sharedState.story.contributions" v-bind:class="{mine: contribution.playerId === sharedState.playerId, theend: contribution.text === 'The End'}">
                {{contribution.text}}
              </div>
            </div>
            <h2 class='theend'>{{sharedState.story.theend}}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
        console.log(`Syncing text for ${this.sharedState.playerId}`)
        request.post('/api/suggest', {
          playerId: this.sharedState.playerId,
          suggestion: this.sharedState.suggestionText
        }, function (err, state) {
          // handle error
          // https://github.com/groupwrite-io/groupwrite.io/issues/58
          if (err) {
            window.alert(err + '\r\n' + state.text)
          }
        })
      },
      theend: function () {
        this.sharedState.suggestionText = 'The End'
        this.syncText()
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
    min-width: 320px;
  }
  
  #story-html {
    text-align: left;
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
  }
  
  #story-html .mine {
    font-weight: bold;
  }
  
  #story h1 {
    margin-bottom: 20px
  }
  
  #story .theend {
    margin-top: 20px;
    font-size: 24px;
    text-align: center;
  }
  
  .action-btn {
    margin-top: 15px;
    margin-bottom: 15px;
    min-width: 100px;
    min-height: 20px;
  }
</style>