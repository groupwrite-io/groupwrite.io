<template>
  <button class='btn' id='quit-btn' v-on:click="quit">Quit</button>
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
        console.log(`${this.sharedState.myNickname} sending quit message`)
        request.post('/api/user/quit')
          .set('Accept', 'application/json')
          .send({ playerId: this.sharedState.playerId })
          .end((err, state) => {
            if (err) {
              assert.fail(`/api/user/quit error ${err.status} - ${err.message} \r\n ${err.stack}`)
            }

            // Navigate back home
            router.replace('/')
          })
      }
    }
  }

</script>