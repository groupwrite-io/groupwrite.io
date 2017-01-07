var express = require('express');
var router = express.Router();
var state = require('../state');

/* GET home page. */
router.get('/state.json', function (req, res, next) {
    res.json(state);
});

module.exports = router;
