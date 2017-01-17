var socket = io();

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
                $.post('/api/login', {nickname: this.nickname}, function (state) {
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
            nickname: null
        },
        methods: {
            quit: function () {
                $.post('/api/quit', {nickname: this.nickname}, function (state) {
                    // TODO handle quit error
                })
                this.seen = false;
                pages.home.seen = true;
            }
        }
    })
};


var socket = io();
