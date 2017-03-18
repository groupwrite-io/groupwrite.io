<template>
  <div class="playerList">
    <h2>Players</h2>
    <ol class="nonelist container">
      <li class="playerListItem" v-for="player in sharedState.players">
        <div v-if="player.nickname != sharedState.myNickname" class='row'>
          <div class="col-md-4">
            <div class='playerbox'>
              <div class="nickname" v-bind:style="{ color: player.color }">
                {{player.nickname}}
              </div>
              <div class="vote-button" v-bind:class="{ voteButtonActive:player.iVotedFor }" :data-playerid="player.id" v-on:click="vote($event)">
                <span class="glyphicon glyphicon-heart voteIcon">
                </span>
              </div>
            </div>
          </div>
          <div class="suggestion col-md-8">
            {{player.suggestion}}
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
        let button = event.target
        if (!button.classList.contains('vote-button')) {
          button = button.parentElement
        }
        var votedForId = button.dataset.playerid
        if (button.classList.contains('voteButtonActive')) {
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
    padding: 0;
  }

  .nickname {
    display: inline-block;
    text-align: center;
    width: 100px;
    font-weight: bold;
    word-wrap: break-word;
    margin: 5px;
  }

  .suggestion {
    display: inline-block;
    width: 325px;
    height: 90px;
    text-align: left;
    word-wrap: break-word;
    border: 2px solid gray;
    padding: 5px;
  }

  .playerbox {
    display: inline-block;
    padding: 5px;
    background: #f5f5f0;
    vertical-align: top;
    height: 90px;
  }

  .vote-button {
    display: inline-block;
    /*background-image: url('../assets/heart-icon.png');*/
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  .voteButtonActive {
    color: red;
    /* Use different style for active and hover
    https://github.com/groupwrite-io/groupwrite.io/issues/60
    */
    /*background-image: url('../assets/heart-icon-hover.png');*/
  }

  .playerListItem {
    margin-top: 20px;
  }

  .vote-button:hover {
    color: blue;
    /*background-image: url('../assets/heart-icon-hover.png');*/
  }
</style>
