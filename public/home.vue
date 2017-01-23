<template>
    <div v-if='seen' id='home-page'>
        <div class="center">
            <h1>write.io</h1>

            <p>Pick a username</p>
            <form onsubmit="return false">
<input id="choosenickname" placeholder="Anonymous" v-model="nickname" autofocus/>
<button id="write-btn" v-on:click="login">Write!</button>
</form>
</div>
</template>

<script>
    import Game from './game.vue'
    import Home from './home.vue'

    export default {
        name: 'home',

        delimiters: ['${', '}'],
        el: '#home-page',
        data() {
            return {
                seen: true,
                nickname: ''
            }
        },

        methods: {
            login: function () {
                $.postJSON('/api/login', {
                    nickname: this.nickname
                }, function (state) {
                    // TODO handle login failure
                });

                pages.game.nickname = this.nickname;
                this.seen = false;
                pages.game.seen = true;
            }
        }
    }
</script>

<style>
</style>