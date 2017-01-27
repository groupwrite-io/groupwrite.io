<template>
  <div class="playerList">
    <h2>List of players</h2>
    <ol>
      <li v-for="player in sharedState.players">
        {{player.nickname}}
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
</style>