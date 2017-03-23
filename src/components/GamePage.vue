<template>
  <div class="game">
  
    <div class='container'>
      <h1 id='welcome'>Welcome {{sharedState.myNickname}}</h1>
      <div class='row'>
        <div class='col-md-1'>
          <div class='row'>
            <button id="submit-btn"
                    class="glyphicon glyphicon-send btn"
                    title='When you finish typing, send in your suggestion'
                    v-on:click="submit"
                    :disabled="sharedState.suggestionText=='' || sharedState.suggestBtnDisabled">
            </button>
            <!--v-bind:class="{ submitButtonActive:player.playerId }" :data-playerid="player.id"-->
          </div>
          <div class='row'>
            <button id='theend-btn'
                    class='action-btn btn'
                    title='Propose an ending to the story'
                    v-on:click='theend'
                    :disabled="isTitleRound() || sharedState.suggestionDisabled"
                    v-on:keyup="syncText">The End</button>
          </div>
        </div>
        <div class='col-md-5'>
          <form>
            <textarea rows=5
                      cols=55
                      id='mytext'
                      :placeholder="isTitleRound() ? 'Suggest a title for the story' : 'Suggest how the story continues'"
                      v-model="sharedState.suggestionText"
                      :disabled="sharedState.suggestionDisabled"
                      v-on:keyup="syncText(); showSubmitHint();"
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
      submitHintShown: false,
      submitHintTriggered: 0,
      voteHintShown: false
    }
  },
  methods: {
    isTitleRound: function () {
      return !this.sharedState.story.title.text
    },
    showSubmitHint: function () {
      const submitHintTimeout = 3000
      const self = this

      // Show submit hint (only the first time)
      if (this.submitHintShown) {
        return
      }

      ++this.submitHintTriggered
      const currentSubmitHintTriggered = this.submitHintTriggered
      setTimeout(() => {
        if (self.submitHintShown || // Just in case
          currentSubmitHintTriggered !== self.submitHintTriggered) {
          // Another trigger has been triggered since then, let's ignore this one
          return
        }

        let intro = introJs('#app')
        intro.setOptions({
          showBullets: false,
          steps: [{
            intro: 'When finished, remember to hit the Submit button', element: '#submit-btn'
          }]
        })
        intro.start()
        self.submitHintShown = true
      }, submitHintTimeout)
    },
    syncText: function () {
      // Sync to server
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
      this.sharedState.suggestionDisabled = true
      this.sharedState.suggestBtnDisabled = true
      request.post('/api/submit', {
        playerId: this.sharedState.playerId,
        suggestionDisabled: this.sharedState.suggestionDisabled
      }, function (err, state) {
        if (err) { console.log(err) }
      })
      console.log(this.sharedState.suggestionDisabled)

      if (!this.voteHintShown) {
        this.voteHintShown = true

        let intro = introJs('#app')
        intro.setOptions({
          showBullets: false,
          steps: [{
            intro: 'After the other players submit their suggestions, be sure to vote for them',
            element: '.vote-button'
          }]
        })
        intro.start()
      }
    }
  },
  mounted: function () {
    document.getElementById('mytext').focus()
    // var self = this

    var audio = new window.Audio('./static/ding.ogg')
    audio.play();

    // startInfo
    (function startIntro() {
      /* eslint-disable quotes */
      let intro = introJs('#app')
      intro.setOptions({
        steps: [
          {
            intro: `Hi, let's write a story together!<br/>
              (<i>Intro will display until completed</i>)`,
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
            element: '#theend-btn'
          }
        ]
      })
      intro.oncomplete(() => {
        window.localStorage.setItem('introComplete', 'true')
      })

      if (!window.localStorage.getItem('introComplete')) {
        intro.start()
      }

      /* eslint-enable quotes */
    })()
  },
  created: function () {
    // debugger
    this.sharedState.socket.on('server:title-round-over', function () {
      console.log('resetting text areas and buttons')
      this.sharedState.suggestionDisabled = false
    })
    this.sharedState.socket.on('server:round-over', function () {
      console.log('resetting text areas and buttons')
      this.sharedState.suggestionDisabled = false
    })
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

#submit-btn {
  display: inline-block;
  width: 32px;
  height: 32px;
  /*cursor: pointer;*/
}



/*#submit-btn:disabled {
  opacity: 0.5;
}*/
</style>