<template>
  <div id="admin">
    <game></game>

    <div id="admin-page">
      <button v-on:click="clearAll">Clear All !</button>
    </div>
  </div>
</template>

<script>
  import Game from './Game.vue'

  export default {
    name: 'admin',
    components: {
      Game
    }
  }
</script>