<template>
  <div id='story'>
    <h1 v-if="sharedState.story.title.text">{{sharedState.story.title.text}}</h1>
    <h1 v-else>The Story's Title</h1>
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
  #story {
    border: 3px black double;
    padding: 5px;
    border-radius: 15px;
    min-width: 320px;
  }
  
  #story-html {
    text-align: left;
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
  }
  
  #story-html .mine {
    font-weight: bold;
  }
  
  #story h1 {
    margin-bottom: 20px
  }
  
  #story .theend {
    margin-top: 20px;
    font-size: 24px;
    text-align: center;
  }
</style>