<template>
  <div>
    <h1>List of players</h1>
    <ol>
      <li v-for="player in players">
        {{player.nickname}}
      </li>
    </ol>
    <button v-on:click="quit">Quit</button>
  </div>
</template>

<script>
  export default {
    name: 'game',

    props: ['players'],
    data() {
      return {
      }
    },
    methods: {
      quit: function () {
        var request = require('superagent')
        request.post('/api/quit', {
          nickname: this.nickname
        }, function (state) {
          // TODO handle quit error
        })
        // TODO navigate Home
      }
    }
  }
</script>

<style>

</style>