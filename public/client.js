function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var global = {};
global.players = [{
    id: 15223,
    nickname: "lora"
        }, {
    id: 7102,
    nickname: "dona"
}];

var pages = {
    login: new Vue({
        el: '#login-page',
        data: {
            seen: true,
            nickname: ''
        },

        methods: {
            login: function () {
                global.currentPlayerId = getRandomArbitrary(0, 10000);
                global.players.push({
                    id: global.currentPlayerId,
                    nickname: this.nickname
                });
                this.seen = false;
                pages.game.seen = true;
            }
        }
    }),
    game: new Vue({
        el: '#game-page',
        data: {
            seen: false,
            players: global.players
        },
        methods: {
            quit: function () {
                // remove me from the list of players
                var myindex = global.players.findIndex(function (element) {
                    return element.id == global.currentPlayerId;
                })
                console.assert(myindex !== -1, "Failed to find current player");

                console.log("Removing player with index " + myindex);
                global.players.splice(myindex, 1);

                this.seen = false;
                pages.login.seen = true;
            }
        }
    })
};


var socket = io();
