<template>
    <div id="app">
        <home></home>
        <game></game>
    </div>
</template>

<script>
    import Game from './game.vue'
    import Home from './home.vue'

    export default {
        name: 'app',

        delimiters: ['${', '}'],
        data() {
            return {
                nickname: ''
            }
        },
        components: {
            Game,
            Home
        },
        created: function () {
            debugger;
            this.$on('nickname-selected', function (params) {
                console.log('nickname-selected event fired, params= ' + params)
            })
            console.log('app.vue registered on nickname-selected events')
        }
    }
</script>

<style>
body {
    padding: 50px;
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
    /* width: 121px; */
}

input {
    padding: 3px;
}

a {
    color: #00B7FF;
}

.center {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    position: absolute;
}
</style>