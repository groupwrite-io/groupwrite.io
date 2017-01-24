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
    export default {
        name: 'home',

        delimiters: ['${', '}'],
        data() {
            return {
                seen: true,
                nickname: ''
            }
        },

        methods: {
            login: function () {
                var request = require('superagent');
                request.post('/api/login', {
                    nickname: this.nickname
                }, function (state) {
                    // TODO handle login failure
                });

                this.seen = false;

                this.$emit('nickname-selected', this.nickname)
                console.log('home emitted nickname-selected event')

                // TODO delete
                //Game.nickname = this.nickname;
                // Game.seen = true;
            }
        }
    }
</script>

<style>
</style>