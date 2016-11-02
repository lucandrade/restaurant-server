'use strict';

var express = require('express');
var router = express.Router();
var response = require('../config/response');
var User = require('../models/user');
var authenticateUser = require('../functions/user/authenticate');
var generateUserToken = require('../functions/user/generateToken');
var authenticate = require('../auth/authenticate');

router.get('/', function (req, res, next) {
    authenticate(req, res, next);
}, function (req, res, next) {
    res.send(response.setAsSuccess().setData(req.query).get());
});

router.post('/auth', function (req, res, next) {
    var body = req.body;

    if (body.password && body.username) {
        authenticateUser(body.username, body.password, function authenticateUserSuccess(user) {
            var token = generateUserToken(user);
            res.send(response.setAsSuccess().setData({
                token: 'JWT ' + token,
                user: user
            }).get());
        }, function authenticateUserError(err) {
            res.send(response.setAsFail().setMessage(err).get());
        });
    } else {
        res.send(response.setAsFail().setMessage('Dados inválidos').get());
    }
});

router.get('/logged', function (req, res, next) {
    authenticate(req, res, next);
}, function (req, res, next) {
    res.send(response.setAsSuccess().setData(req.isAuthenticated()).get());
});

router.get('/list', function (req, res, next) {
    authenticate(req, res, next);
}, function (req, res, next) {
    User.find(function (err, data) {
        res.send(response.setAsSuccess().setData({users: data}).get());
    });
});

module.exports = router;
