'use strict';

var express = require('express');
var router = express.Router();
var response = require('../config/response');

router.get('/', function (req, res, next) {
    res.send(response.setAsSuccess().setData(req.query).get());
});

router.get('/error', function (req, res, next) {
    throw new Error('testando erro');
});

router.get('/users', function (req, res, next) {
    var User = require('../models/User');
    User.find(function (err, data) {
        res.send(response.setAsSuccess().setData({users: data}).get());
    });
});

module.exports = router;
