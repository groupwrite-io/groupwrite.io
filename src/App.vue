<template>
  <div id="app">
    <div class="debug">
      <common></common>

      <p>
        <router-link to="/">Home</router-link>
        <router-link to="/game">Game</router-link>
        <router-link to="/admin">Admin</router-link>
      </p>
    </div>
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
.debug {
  background-color:lightgray
}
a {
  margin-right: 10px;
}
</style>