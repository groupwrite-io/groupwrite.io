<template>
  <div>
    <div class="center">
      <h1>write.io</h1>

      <p>Pick a username</p>
      <form onsubmit="return false">
<input id="choosenickname" placeholder="Anonymous" v-model="nickname" autofocus/>
<button id="write-btn" v-on:click="login">Write!</button>
</form>
</div>
</template>

<script>
  var VueRouter = require('vue-router')
  var router = new VueRouter()

  export default {
    name: 'home',

    delimiters: ['${', '}'],
    data() {
      return {
        nickname: ''
      }
    },

    methods: {
      login: function () {
        var request = require('superagent')
        request.post('/api/login', {
          nickname: this.nickname
        }, function (err, state) {
          // TODO handle login failure
          if (err) {
            console.log(err)
          } else {
            debugger
            router.replace('/game')
          }
        })

        this.$emit('nickname-selected', this.nickname)
        console.log('home emitted nickname-selected event')
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