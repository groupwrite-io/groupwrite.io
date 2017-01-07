$.get('/api/state.json', function (state) {
    pages.game.players = state.players;
});
