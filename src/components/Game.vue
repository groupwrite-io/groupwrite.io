<template>
  <div class="game">
    <h1>Welcome {{sharedState.myNickname}}</h1>
    <form>
      <textarea rows=3 cols=50 id='mytext' placeholder="Enter your text here" ></textarea>
    </form>
    <h2>List of players</h2>
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
  import store from './store'

  export default {
    name: 'game',

    props: ['players'],
    data() {
      return {
        sharedState: store.state
      }
    },
    methods: {
      quit: function () {
        var request = require('superagent')
        debugger
        console.log(`${this.nickname} sending quit message`)
        request.post('/api/quit', {
          nickname: this.sharedState.myNickname
        }, function (err, state) {
          if (err) {
            debugger
            assert.fail(`/ quit error ${err.status} - ${err.message} \r\n ${err.stack}`)
          }
        })
        // TODO navigate Home
      }
    },
    mounted: function () {
      document.getElementById('mytext').focus()
    }
  }
</script>

<style>

</style>
