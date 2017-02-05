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
          <div class="vote-button">
          </div>
        </div>
        <div class="displayblock"></div>
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