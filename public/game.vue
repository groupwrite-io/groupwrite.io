<!-- Forked from https://raw.githubusercontent.com/vuejs-templates/webpack-simple/master/template/src/App.vue -->
<template>
    <div v-if='seen' id='game-page'>
        <h1>List of players</h1>
        <ol>
            <li v-for="player in players">
                ${player.nickname}
            </li>
        </ol>
        <button v-on:click="quit">Quit</button>
    </div>
</template>

<script>
    import Home from './home.vue'

    export default {
        name: 'game',

        delimiters: ['${', '}'],
        data() {
            return {
                seen: false,
                players: [],
                nickname: null
            }
        },
        methods: {
            quit: function () {
                $.postJSON('/api/quit', {
                    nickname: this.nickname
                }, function (state) {
                    // TODO handle quit error
                })
                this.seen = false;
                Home.seen = true;
            }
        }
    }
</script>

<style>

</style>