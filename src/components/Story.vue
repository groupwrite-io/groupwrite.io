<template>
  <div id='story'>
    <h1>The Story's Title</h1>
    <div id="story-html">
      <div v-for="contribution in sharedState.story.contributions" v-bind:class="{mine: contribution.playerId === sharedState.playerId, theend: contribution.text === 'The End'}">
        {{contribution.text}}
      </div>
    </div>
    <h2 class='theend'>{{sharedState.story.theend}}</h2>
  </div>
</template>

<script>
  import store from './store'

  export default {
    name: 'Game',
    components: {},
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