var express = require('express');
var router = express.Router();
var state = require('../state');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'writing.io'
    });
});

router.get('/admin', function (req, res, next) {
    res.render('admin', {
        title: 'writing.io admin'
    });
});

module.exports = router;
