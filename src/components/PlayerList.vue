<template>
  <div class="playerList">
    <h2>List of players</h2>
    <ol class="nonelist">
      <li v-for="player in sharedState.players">
        <div v-if="player.nickname != sharedState.myNickname">
          {{player.nickname}}
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
  ol.nonelist {list-style-type: none;}
</style>
