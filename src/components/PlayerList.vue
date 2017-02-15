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
          <div class="vote-button">
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>
<script>
  import store from './store'

  export default {
    name: 'PlayerList',
    props: ['players'],
    data() {
      return {
        sharedState: store.state
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

  .playerListItem {
    // display: block;
    //width: 500px;
    //border: 2px solid gray;
  }
.playerbox {
    display: inline-block;
    width: 500px;
    border: 1px dashed;
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

</style>
