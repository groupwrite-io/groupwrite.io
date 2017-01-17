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
                socket.emit('client:login', this.nickname);
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
                socket.emit('client:quit', this.nickname);
                this.seen = false;
                pages.home.seen = true;
            }
        }
    })
};


var socket = io();
