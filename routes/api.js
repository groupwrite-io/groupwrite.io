var express = require('express');
var router = express.Router();
var state = require('../state');

/* GET state. */
router.get('/state', function (req, res, next) {
    res.json(state);
});

/* POST clear all. */
router.post('/clearAll', function (req, res, next) {
    state.clearAll();
});



module.exports = router;
