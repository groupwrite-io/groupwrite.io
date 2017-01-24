$.get('/api/state', function (state) {
    // TODO Fix
    // pages.game.players = state.players;
});

new Vue({
    delimiters: ['${', '}'],

    el: '#admin-page',

    methods: {
        clearAll: function () {
            $.post('/api/clearAll', function (result) {
                if (result == true) {
                    alert('Cleared!');
                }
                else {
                    alert('Error');
                }
            });
        }
    }
});

