<template>
  <div class="playerList">
      <h2>List of players</h2>
      <ol>
        <li v-for="player in players">
          {{player.nickname}}
        </li>
      </ol>
  </div>
</template>

<script>
  export default {
    name: 'PlayerList',
    props: ['players'],
    data() {
      return {

      }
    }
  }
</script>

<style>
</style>
