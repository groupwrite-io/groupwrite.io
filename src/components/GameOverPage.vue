<template>
  <div class="game">
  
    <div class='container'>
      <h1>Game Over</h1>
      <div class='row'>
      </div>
      <story></story>
      <p>In order to find your story in the future, just <a :href="'/#/story?id=' + sharedState.story.id"
           target="_blank">click here.</a></p>
    </div>
  </div>
</template>
<script>
import store from './store'
import Story from './Story'

//  var request = require('superagent')

export default {
  name: 'GameOverPage',
  components: {
    Story
  },
  data() {
    return {
      sharedState: store.state
    }
  },
  methods: {
  }
}

</script>
<style>

</style>