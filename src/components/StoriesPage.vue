<template>
  <div class="game">

    <div class='container'>
      <h1 id='stories'>All Stories</h1>
      <span v-if='loading' class='loading'>Loading...</span>
      <ol class="nonelist container">
        <li class="storylink" v-for="story in stories">
          <a v-bind:href="'/#/story?id=' + story._id">{{story.title.text}}</a>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
  import store from './store'
  import Story from './Story'
  import request from 'superagent'

  export default {
    name: 'GameOverPage',
    components: {
      Story
    },
    data() {
      return {
        sharedState: store.state,
        stories: {},
        loading: true
      }
    },
    mounted: function () {
      const self = this
      request.get('/api/stories/list',
        function (err, response) {
          // handle error
          // https://github.com/groupwrite-io/groupwrite.io/issues/58
          if (err) {
            window.alert(err + '\r\n' + err.text)
            return
          }
          self.stories = response.body
          self.loading = false
        })
    }
  }

</script>
<style>
  .storylink {
    margin-top: 5px;
  }
</style>