<template>
  <button id='quit-btn' v-on:click="quit">Quit</button>
</template>

<script>
  import assert from 'assert'
  import store from './store'

  var VueRouter = require('vue-router')
  var router = new VueRouter()

  export default {
    name: 'QuitButton',
    data() {
      return {
        sharedState: store.state
      }
    },
    methods: {
      quit: function () {
        var request = require('superagent')
        console.log(`${this.nickname} sending quit message`)
        request.post('/api/quit', {
          nickname: this.sharedState.myNickname
        }, function (err, state) {
          if (err) {
            assert.fail(`/ quit error ${err.status} - ${err.message} \r\n ${err.stack}`)
          }
        })

        // Navigate back home
        router.replace('/')
      }
    }
  }
</script>