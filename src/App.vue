<template>
  <div id="app">
    <img src="./assets/logo.png">
    <common></common>

    <p>
      <router-link to="/">Go to Home</router-link>
      <router-link to="/game">Go to Game</router-link>
    </p>
    <router-view></router-view>

  </div>
</template>

<script>
  import Common from './components/Common'

  export default {
    name: 'app',
    components: {
      Common
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>