<template>
  <div class="game">

    <div class='container'>
      <h1 v-if='loading' id='loading'>Loading...</h1>
      <div class='row'>
      </div>
      <story></story>
    </div>
  </div>
</template>
<script>
  import store from './store'
  import Story from './Story'
  import request from 'superagent'
  import URLSearchParams from 'url-search-params'

  export default {
    name: 'GameOverPage',
    components: {
      Story
    },
    data() {
      return {
        sharedState: store.state,
        loading: true
      }
    },
    mounted: function () {
      const self = this
      let splitHash = window.location.hash.split('?')
      if (splitHash.length < 2) {
        // No story ID present
        return
      }
      let storyId = new URLSearchParams(splitHash[1]).get('id')
      request.get('/api/stories/get', {
        storyId
      }, function (err, response) {
        // handle error
        // https://github.com/groupwrite-io/groupwrite.io/issues/58
        if (err) {
          window.alert(err + '\r\n' + err.text)
          return
        }
        self.loading = false
        self.sharedState.story = response.body
      })
    }
  }

</script>
<style>

</style>