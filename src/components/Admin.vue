<template>
  <div id="admin">
    <game></game>

    <div id="admin-page">
      <button v-on:click="clearAll">Clear All !</button>
    </div>
  </div>
</template>

<script>
  import Game from './game.vue'

  export default {
    name: 'admin',
    components: {
      Game
    },

    methods: {
      clearAll: function () {
        var request = require('superagent')
        request.post('/api/clearAll', function (result) {
          if (result === true) {
            window.alert('Cleared!')
          } else {
            window.alert('Error')
          }
        })
      }
    }
  }
</script>