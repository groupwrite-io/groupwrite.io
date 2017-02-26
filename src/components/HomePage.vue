<template>
  <div>
    <a class="github-fork-ribbon" href="https://github.com/groupwrite-io/groupwrite.io" title="Fork me on GitHub">Fork me on GitHub</a>
    <div class="col-md-4 col-md-offset-4 home">
      <h1>groupwrite.io</h1>

      <p>Pick a username</p>
      <form onsubmit="return false" class="form-inline">
        <div class="form-group">
          <input id="choosenickname" placeholder="Anonymous" v-model="sharedState.myNickname" class="form-control" type="text" autofocus/>
        </div>
        <div class="text-center">
          <button class="btn btn-default" type="submit" id="write-btn" v-on:click="login">Write!</button>
        </div>
      </form>
    </div>
    <span id="legal-notice">
      * By clicking the above button you specifically give us the following permission, you grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use any IP content that you post on Grouwrite.io.
    </span>
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
        request.post('/api/user/login')
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
/*  
  input {
    padding: 3px;
    border-radius: 3px;
  }
  */

 

  a {
    color: #00B7FF;
  }

  #legal-notice {
    font-size: 10px;
    position: absolute;
    bottom: 10px;
    left: 15px;
    color: #333;
    text-align: left;
  }
</style>