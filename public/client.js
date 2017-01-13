var socket = io();

socket.on('server:state', function (state) {
    pages.game.players = state.players;
});

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
            players: []
        },
        methods: {
            quit: function () {
                socket.emit('client:quit', pages.login.nickname);

                this.seen = false;
                pages.login.seen = true;
            }
        }
    })
};


var socket = io();
