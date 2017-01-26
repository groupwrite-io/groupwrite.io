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
  import assert from 'assert'
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
        debugger
        console.log(`${this.nickname} sending quit message`)
        request.post('/api/quit', {
          nickname: this.nickname
        }, function (err, state) {
          if (err) {
            debugger
            assert.fail(`/ quit error ${err.status} - ${err.message} \r\n ${err.stack}`)
          }
        })
        // TODO navigate Home
      }
    }
  }
</script>

<style>

</style>