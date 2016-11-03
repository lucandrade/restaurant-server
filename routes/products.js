'use strict';

var express = require('express');
var router = express.Router();
var response = require('../config/response');
var config = require('../config/app');
var upload = require('../config/upload');
var createProduct = require('../functions/product/create');
var findProduct = require('../functions/product/findActive');
var authenticate = require('../auth/authenticate');

router.use(function (req, res, next) {
    authenticate(req, res, next);
});

router.get('/', function (req, res, next) {
    findProduct(function (products) {
        res.send(response.setAsSuccess().setData(products).get());
    }, function (err) {
        return next(err);
    });
});

router.post('/', upload.array('image'), function (req, res, next) {
    var body = req.body;
    body.images = [];

    for (var i in req.files) {
        body.images.push({
            url: config.upload_url + req.files[i].filename,
            filename: req.files[i].originalname,
            mimetype: req.files[i].mimetype,
            encoding: req.files[i].encoding,
            size: req.files[i].size,
        });
    }

    createProduct(body, function createProduct(product) {
        res.send(response.setAsSuccess().setData(product).get());
    }, function (err) {
        if (err.messages) {
            res.send(response.setAsFail().setMessage(err.messages).get());
        } else {
            next(err);
        }
    });
});

module.exports = router;
