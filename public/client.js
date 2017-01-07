function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var global = {};
global.players = [];

var socket = io();

socket.on('server:joined', function (nickname) {
    global.currentPlayerId = getRandomArbitrary(0, 10000);
    global.players.push({
        id: global.currentPlayerId,
        nickname: nickname
    });
});

socket.on('server:quit', function (nickname) {
    // remove me from the list of players
    var myindex = global.players.findIndex(function (element) {
        return element.nickname == nickname;
    })
    console.assert(myindex !== -1, "Failed to find current player");
    global.players.splice(myindex, 1);
});

var pages = {
    login: new Vue({
        delimiters: ['${', '}'],

        el: '#login-page',
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
            players: global.players
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
