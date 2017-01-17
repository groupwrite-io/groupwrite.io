var express = require('express');
var router = express.Router();
var State = require('../state');
var io = require('../server');
var assert = require('assert');

/* GET state. */
router.get('/state', function (req, res, next) {
    res.json(State.state);
});

/* GET state. */
router.get('/error', function (req, res, next) {
    assert.fail("This returns an error");
});

/* POST clear all. */
router.post('/clearAll', function (req, res, next) {
    State.clearAll();
    io.io.emit('server:state', State.state);
    res.send(true);
});

router.post('/login', function(req, res, next) {
    State.state.players.push({
        nickname: req.params.nickname
    });
    io.emit('server:state', State.state);
});


module.exports = router;
