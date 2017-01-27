<template>
  <div id="admin">
    <player-list></player-list>
    <div id="admin-page">
      <button v-on:click="clearAll">Clear All !</button>
    </div>
  </div>
</template>

<script>
  import PlayerList from './PlayerList.vue'
  import assert from 'assert'

  export default {
    name: 'Admin',
    components: {
      PlayerList
    },
    methods: {
      clearAll: function () {
        var request = require('superagent')
        request.post('/api/clearAll', function (err, result) {
          assert(!err)
          assert(result.status === 200)
          window.alert('Cleared!')
        })
      }
    }

  }
</script>
