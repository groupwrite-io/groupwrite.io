<template>
  <div class="game">

    <div class='container'>
      <h1>Welcome {{sharedState.myNickname}}</h1>
      <div class='row'>
        <div class='col-md-1'>
          <div class='row'>
            <div class="submit-btn" title='You finished typing, send in your suggestion' v-on:click="submit"></div>
              <!--v-bind:class="{ submitButtonActive:player.playerId }" :data-playerid="player.id"-->
          </div>
          <div class='row'>
            <button class='action-btn' title='Propose an ending to the story' v-on:click='theend' :disabled="suggestionDisabled == 1 ? true : false" v-on:keyup="syncText">The End</button>
          </div>
        </div>
        <div class='col-md-5'>
          <form>
            <textarea rows=5 cols=55 id='mytext' placeholder="Enter your text here" v-model="sharedState.suggestionText" :disabled="suggestionDisabled == 1 ? true : false" v-on:keyup="syncText"
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
        suggestionDisabled: false
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
      },
      submit: function () {
        console.log(`submitting text for ${this.sharedState.playerId}`)
        this.suggestionDisabled = true
        request.post('/api/submit', {
          playerId: this.sharedState.playerId,
          suggestionDisabled: this.suggestionDisabled
        }, function (err, state) {
          if (err) { console.log(err) }
        })
        console.log(this.suggestionDisabled)
      }
    },
    mounted: function () {
      document.getElementById('mytext').focus()
      // var self = this
      var audio = new window.Audio('./static/ding.ogg')
      audio.play()
    },
    created: function () {
      // debugger
      this.sharedState.socket.on('server:title-round-over', function () {
        console.log('resetting text areas and buttons')
        this.suggestionDisabled = false
      })
      this.sharedState.socket.on('server:round-over', function () {
        console.log('resetting text areas and buttons')
        this.suggestionDisabled = false
      })
    }
  }
</script>

<style>
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
      background-image: url('../assets/send-icon.png'); 
      width: 32px; 
      height: 32px; 
      cursor: pointer;      
 }
</style>