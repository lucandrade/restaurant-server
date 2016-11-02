var express = require('express');
var router = express.Router();
var response = require('../config/response');

router.get('/', function(req, res, next) {
    res.send(response.setAsSuccess().setData(req.query).get());
});

router.get('/error', function(req, res, next) {
    throw new Error('testando erro');
});

module.exports = router;
