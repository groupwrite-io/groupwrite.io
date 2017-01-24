var socket = require('socket.io-client')();
socket.on('server:state', function (state) {
    pages.game.players = state.players;
});

var myNickname = '';


var Vue = require('vue');
var App = require('./App.vue');

//var Home = require('./Home.vue');
//var Game = require('./Game.vue');
/*
import Vue from 'vue';
import Home from './Home.vue';
import Game from './Game.vue';
*/

new Vue({
    el: '#app',
    render: h => h(App)
})
