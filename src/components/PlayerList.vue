<template>
  <div class="playerList">
    <h2>List of players</h2>
    <ol class="nonelist">
      <li v-for="player in sharedState.players">
        <div v-if="player.nickname != sharedState.myNickname">
          <div class="nickname">
            {{player.nickname}}
          </div>
          <div class="suggestion">
            {{player.suggestion}}
          </div>
          <div class="vote-button" :data-playerid="player.id" v-on:click="vote($event)">
          </div>
        </div>
        <div class="displayblock"></div>
      </li>
    </ol>
  </div>
</template>
<script>
  import store from './store'
  import assert from 'assert'
  var request = require('superagent')

  export default {
    name: 'PlayerList',
    props: ['players'],
    data() {
      return {
        sharedState: store.state
      }
    },
    methods: {
      vote: function (event) {
        var voterId = this.sharedState.playerId
        var votedForId = event.target.dataset.playerid
        debugger
        request.post('/api/vote', {
          voterId,
          votedForId
        }, function (err, result) {
          assert(!err)
          console.log('Player ' + voterId + ' voted for player ' + votedForId)
        })
      }
    }
  }

</script>
<style>
  ol.nonelist {
    list-style-type: none;
  }
  
  .playerList li {
    display: inline-block;
    width: 500px
  }
  
  .displayblock {
    display: block;
  }
  
  .vote-button {
    background-image: url('../assets/heart-icon.png');
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
  
  .vote-button:hover {
    background-image: url('../assets/heart-icon-hover.png');
  }

</style>
