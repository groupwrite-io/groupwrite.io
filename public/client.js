var socket = require('socket.io-client')();
socket.on('server:state', function (state) {
    // TODO fix
    // pages.game.players = state.players;
});

var myNickname = '';

var Vue = require('vue');
var App = require('./App.vue');

new Vue({
    el: '#app',
    render: h => h(App)
})
