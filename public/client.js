var socket = require('socket.io-client')();
var $ = require('jQuery');

$.postJSON = function (url, data, callback) {
    return jQuery.ajax({
        'type': 'POST',
        'url': url,
        'contentType': 'application/json',
        'data': JSON.stringify(data),
        'dataType': 'json',
        'success': callback
    });
};

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
