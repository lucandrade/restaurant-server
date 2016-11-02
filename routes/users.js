'use strict';

var express = require('express');
var router = express.Router();
var response = require('../config/response');
var User = require('../models/User');

router.get('/', function (req, res, next) {
    res.send(response.setAsSuccess().setData(req.query).get());
});

router.post('/auth', function (req, res, next) {
    
});

router.get('/list', function (req, res, next) {
    User.find(function (err, data) {
        res.send(response.setAsSuccess().setData({users: data}).get());
    });
});

module.exports = router;
