var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.find(function (err, nerds) {

        // if there is an error retrieving, send the error. 
        // nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(nerds); // return all nerds in JSON format
    });
});

router.get('/', function (req, res, next) {
    res.send("Not implemented yet");
});

module.exports = router;
