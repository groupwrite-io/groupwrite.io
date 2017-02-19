<template>
  <div>
    <div class="center home">
      <h1>groupwrite.io</h1>

      <p>Pick a username</p>
      <form onsubmit="return false">
        <input id="choosenickname" placeholder="Anonymous" v-model="sharedState.myNickname" autofocus/>
        <button id="write-btn" v-on:click="login">Write!</button>
      </form>
    </div>
</template>

<script>
  var VueRouter = require('vue-router')
  var router = new VueRouter()
  import store from './store'

  export default {
    name: 'HomePage',

    data() {
      return {
        sharedState: store.state
      }
    },
    created: function () {
      this.sharedState.myNickname = ''
      this.sharedState.players = []
    },
    methods: {
      login: function () {
        const uuidV4 = require('uuid/v4')
        this.sharedState.playerId = uuidV4()
        console.log(`New player (${this.sharedState.myNickname}, ${this.sharedState.playerId})`)

        var request = require('superagent')
        request.post('/api/login')
          .set('Accept', 'application/json')
          .send({ playerId: this.sharedState.playerId })
          .send({ nickname: this.sharedState.myNickname })
          .end((err, state) => {
            // handle login failure
            // https://github.com/groupwrite-io/groupwrite.io/issues/58
            if (err) {
              window.alert(err + '\r\n' + state.text)
            } else {
              router.replace('/queue')
            }
          })

        // debugger
        // this.$root.global.myNickname = this.nickname
      }
    }
  }

</script>

<style>
  body {
    padding: 50px;
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
    /* width: 121px; */
  }
  
  input {
    padding: 3px;
  }
  
  a {
    color: #00B7FF;
  }
</style>