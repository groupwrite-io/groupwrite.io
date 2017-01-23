<template>
    <div id="app"></div>
</template>

<script>
    import Game from './game.vue'
    import Home from './home.vue'

    export default {
        name: 'app',

        delimiters: ['${', '}'],
        data() {
            return {
                seen: true,
            }
        },
        components: {
            Game,
            Home
        }
    }
</script>

<style>
</style>