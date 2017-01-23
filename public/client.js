var socket = io();

$.postJSON = function(url, data, callback) {
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

var pages = {
    home: new Vue({
        delimiters: ['${', '}'],

        el: '#home-page',
        data: {
            seen: true,
            nickname: ''
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
    }),
    game: new Vue({
        delimiters: ['${', '}'],
        el: '#game-page',
        data: {
            seen: false,
            players: [],
            playerText: "",
            nickname: null
        },
        methods: {
            quit: function () {
                $.postJSON('/api/quit', {
                    nickname: this.nickname
                }, function (state) {
                    // TODO handle quit error
                })
                this.seen = false;
                pages.home.seen = true;
            },
            submitText: function(){
                socket.emit('client:submitText', pages.login.nickname, this.playerText);
            }
        }
    })
};


var socket = io();
