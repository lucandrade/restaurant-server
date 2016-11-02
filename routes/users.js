'use strict';

var express = require('express');
var router = express.Router();
var response = require('../config/response');
var User = require('../models/user');
var authenticateUser = require('../functions/authenticateUser');
var generateUserToken = require('../functions/generateUserToken');

router.get('/', function (req, res, next) {
    res.send(response.setAsSuccess().setData(req.query).get());
});

router.post('/auth', function (req, res, next) {
    var body = req.body;

    if (body.password && body.username) {
        authenticateUser(body.username, body.password, function authenticateUserSuccess(user) {
            var token = generateUserToken(user);
            res.send(response.setAsSuccess().setData(token).get());
        }, function authenticateUserError(err) {
            res.send(response.setAsFail().setMessage(err).get());
        });
    } else {
        res.send(response.setAsFail().setMessage('Dados inválidos').get());
    }
});

router.get('/list', function (req, res, next) {
    User.find(function (err, data) {
        res.send(response.setAsSuccess().setData({users: data}).get());
    });
});

module.exports = router;
