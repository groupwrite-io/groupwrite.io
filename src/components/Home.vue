<template>
  <div>
    <div class="center home">
      <h1>write.io</h1>

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
    name: 'home',

    data() {
      return {
        sharedState: store.state
      }
    },
    created: function () {
      this.sharedState.myNickname = ''
    },
    methods: {
      login: function () {
        console.log(`Player selected nickname ${this.sharedState.myNickname}`)

        var request = require('superagent')
        request.post('/api/login', {
          nickname: this.sharedState.myNickname
        }, function (err, state) {
          // TODO handle login failure
          if (err) {
            console.log(err)
          } else {
            router.replace('/game')
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

.center {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    position: absolute;
}
</style>
