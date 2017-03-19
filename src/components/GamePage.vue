<template>
  <div class="game">

    <div class='container'>
      <h1 id='welcome'>Welcome {{sharedState.myNickname}}</h1>
      <div class='row'>
        <div class='col-md-1'>
          <div class='row'>
            <div title='You finished typing, send in your suggestion' v-on:click="submit"></div>
            <span class="glyphicon glyphicon-send submit-btn">
              </span>
            <!--v-bind:class="{ submitButtonActive:player.playerId }" :data-playerid="player.id"-->
          </div>
          <div class='row'>
            <button v-if="!isTitleRound()" class='action-btn' title='Propose an ending to the story' v-on:click='theend' :disabled="suggestionDisabled == 1 ? true : false"
              v-on:keyup="syncText">The End</button>
          </div>
        </div>
        <div class='col-md-5'>
          <form>
            <textarea rows=5 cols=55 id='mytext' :placeholder="isTitleRound() ? 'Suggest a title for the story' : 'Suggest how the story continues'"
              v-model="sharedState.suggestionText" :disabled="suggestionDisabled == 1 ? true : false" v-on:keyup="syncText"
              spellcheck='true'></textarea>
          </form>
          <player-list></player-list>
          <quit-button></quit-button>
        </div>
        <div class='col-md-2'>
        </div>
        <div class='col-md-4'>
          <story></story>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import store from './store'
  import PlayerList from './PlayerList.vue'
  import QuitButton from './QuitButton'
  import Story from './Story'
  import * as IntroJs from 'intro.js/minified/intro.min.js'
  // import * as IntroJs from 'intro.js/intro.js'
  const introJs = IntroJs.introJs

  var request = require('superagent')

  export default {
    name: 'GamePage',
    components: {
      PlayerList,
      QuitButton,
      Story
    },
    data() {
      return {
        sharedState: store.state,
        suggestionDisabled: 0
      }
    },
    methods: {
      isTitleRound: function () {
        return !this.sharedState.story.title.text
      },
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
      },
      submit: function () {
        console.log(`submitting text for ${this.sharedState.playerId}`)
        this.suggestionDisabled = 1
        console.log(this.suggestionDisabled)
      }
    },
    mounted: function () {
      document.getElementById('mytext').focus()

      var audio = new window.Audio('./static/ding.ogg')
      audio.play();

      (function startIntro() {
        /* eslint-disable quotes */
        var intro = introJs('#app')
        intro.setOptions({
          steps: [
            {
              intro: "Hi, let's write a story together!",
              element: "#welcome"
            },
            {
              intro: "You suggest the story's title or content here.",
              element: "#mytext"
            },
            {
              intro: "Vote on other people's suggestions here",
              element: document.querySelectorAll('.vote-button')[0]
            },
            {
              intro: 'Top suggestions are added to the ongoing story',
              element: '#story',
              position: 'left'
            },
            {
              intro: "Suggest 'The End' to finish the story",
              element: '#mytext'
            }
          ]
        })

        intro.start()
        /* eslint-enable quotes */
      })()
    }
  }

</script>
<style>
  /* @import '../node_modules/intro.js/minified/introjs.min.css' */
  /* This comment prevents VS Code auto-format from breaking :( */
  
  #mytext {
    padding: 5px;
  }
  
  .action-btn {
    margin-top: 15px;
    margin-bottom: 15px;
    min-width: 100px;
    min-height: 20px;
  }
  
  .submit-btn {
    display: inline-block;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
</style>