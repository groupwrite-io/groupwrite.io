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


var Vue = require('vue').Vue;
    var Home = require('./Home.vue').Home;
    var Game = require('./Game.vue').Game;
    /*
    import Vue from 'vue';
    import Home from './Home.vue';
    import Game from './Game.vue';
    */

    new Vue({
        el: '#app',
        render: h => h(Home)
    })
