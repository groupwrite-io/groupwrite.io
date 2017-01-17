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
                $.post('/api/login', {nickname: this.nickname}, function (state) {
                    // TODO handle login failure
                });

                
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
                $.post('/api/quit', {nickname: pages.login.nickname}, function (state) {
                    // TODO handle quit error
                })

                this.seen = false;
                pages.login.seen = true;
            }
        }
    })
};


var socket = io();
