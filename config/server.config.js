module.exports = {
    MAX_PLAYERS_IN_GAME: 3,
    noPlayerFoundMessage: id => `No player found with ID ${id}`,

    secret: {
        // This should be encrypted
        // https://github.com/groupwrite-io/groupwrite.io/issues/37
        adminKey: 'nalkFaoKsjd78',
        sessionSecret: 'my-secret'
    }
};
