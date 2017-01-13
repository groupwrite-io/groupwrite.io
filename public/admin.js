$.get('/api/state', function (state) {
    pages.game.players = state.players;
});

//new Vue({
//    delimiters: ['${', '}'],
//
//    el: '#admin-page',
//    },
//
//    methods: {
//        clearAll: function () {
////            socket.emit('client:clearAll', this.nickname);
////            $.post()
//            this.seen = false;
//            pages.game.seen = true;
//        }
//    }

