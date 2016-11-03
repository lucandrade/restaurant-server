'use strict';

var express = require('express');
var router = express.Router();
var response = require('../config/response');
var createTable = require('../functions/table/create');
var updateTable = require('../functions/table/update');
var findById = require('../functions/table/findById');
var findActive = require('../functions/table/findActive');
var findBusy = require('../functions/table/findBusy');
var findFree = require('../functions/table/findFree');
var authenticate = require('../auth/authenticate');

router.use(function (req, res, next) {
    authenticate(req, res, next);
});

router.get('/', function (req, res, next) {
    findActive(function (tables) {
        res.send(response.setAsSuccess().setData(tables).get());
    }, function (err) {
        return next(err);
    });
});

router.get('/free', function (req, res, next) {
    findFree(function (tables) {
        res.send(response.setAsSuccess().setData(tables).get());
    }, function (err) {
        return next(err);
    });
});

router.get('/busy', function (req, res, next) {
    findBusy(function (tables) {
        res.send(response.setAsSuccess().setData(tables).get());
    }, function (err) {
        return next(err);
    });
});

router.get('/:id', function (req, res, next) {
    findById(req.params.id, function (table) {
        res.send(response.setAsSuccess().setData(table).get());
    }, function (err) {
        return next(err);
    });
});

router.post('/', function (req, res, next) {
    var body = req.body;

    createTable(body, function createTable(table) {
        res.send(response.setAsSuccess().setData(table).get());
    }, function (err) {
        if (err.messages) {
            res.send(response.setAsFail().setMessage(err.messages).get());
        } else {
            next(err);
        }
    });
});

router.put('/:id', function (req, res, next) {
    var body = req.body;

    updateTable(req.params.id, body, function updateTable(table) {
        res.send(response.setAsSuccess().setData(table).get());
    }, function (err) {
        if (err.messages) {
            res.send(response.setAsFail().setMessage(err.messages).get());
        } else {
            next(err);
        }
    });
});

module.exports = router;
