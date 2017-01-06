var global = {};
global.players = [{
    id: 15223,
    nickname: "lora"
        }, {
    id: 7102,
    nickname: "dona"
}];

var login = new Vue({
    el: '#login-page',
    data: {
        title: 'write.io',
        nickname: ''
    },

    methods: {
        login: function () {
            global.players.push({
                id: 422,
                nickname: this.nickname
            });
            this.nickname = '';
        }
    }
});

var game = new Vue({
    el: '#game-page',
    data: {
        players: global.players
    }
});
