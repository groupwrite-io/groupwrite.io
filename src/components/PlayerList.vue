<template>
  <div class="playerList">
    <h2>Players</h2>
    <ol class="nonelist">
      <li class="playerListItem" v-for="player in sharedState.players">
        <div v-if="player.nickname != sharedState.myNickname" class="playerbox">
          <div class="nickname">
            {{player.nickname}}:
          </div>
          <div class="suggestion">
            {{player.suggestion}}
          </div>
          <!-- TODO - Refactor double vote button -->
          <div v-if="!player.iVotedFor">
            <div class="vote-button" :data-playerid="player.id" v-on:click="vote($event)">
            </div>
          </div>
          <div v-if="player.iVotedFor">
            <div class="vote-button vote-button-active" :data-playerid="player.id" v-on:click="vote($event)">
            </div>
          </div>
        </div>
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

        if (event.target.classList.contains('vote-button-active')) {
          request.post('/api/removevote', { voterId }, function (err, result) {
            assert(!err)
            console.log(`Player ${voterId} removed voted`)
          })
        } else {
          request.post('/api/vote', {
            voterId,
            votedForId
          }, function (err, result) {
            assert(!err)
            console.log(`Player ${voterId} + voted for player ${votedForId}`)
          })
        }
      }
    }
  }

</script>
<style>
  body {
    margin: 0;
    padding: 0;
  }

  ol.nonelist {
    list-style-type: none;
  }

  .nickname {
    display: inline-block;
    text-align: center;
    width: 100px;
    height: 50px;
    background: #f5f5f0;
  }

  .suggestion {
    display: inline-block;
    width: 300px;
    height: 50px;
    text-align: left;
    word-wrap: break-word;
    border: 2px solid gray;
  }

  .vote-button {
    display: inline-block;
    background-image: url('../assets/heart-icon.png');
    width: 32px;
    height: 32px;
    cursor: pointer;
    position: absolute;
  }

  .vote-button:hover {
    background-image: url('../assets/heart-icon-hover.png');
  }

  .displayblock {
    display: block;
  }

  .vote-button-active {
    /* TODO: Use different style for active and hover */
    background-image: url('../assets/heart-icon-hover.png');
  }

  .nickname {
    font-weight: bold;
  }
</style>