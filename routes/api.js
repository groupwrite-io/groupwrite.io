var express = require('express');
var router = express.Router();
var State = require('../state');
var io = require('../server').io;
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
    io.emit('server:state', State.state);
    res.send(true);
});



module.exports = router;
