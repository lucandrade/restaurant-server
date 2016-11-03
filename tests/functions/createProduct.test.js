'use strict';

var utils = require('../utils');
var createProduct = require('../../functions/product/create');
var assert = require('assert');
var data = {
    name: 'Producto',
    description: 'Produto'
}

describe('createProduct: functions', function () {
    it('should get product validation errors', function (done) {
        createProduct({}, function (product) {
            assert.ok(false);
            done();
        }, function (err) {
            assert.equal(err.messages['name'], 'Nome do produto é obrigatório');
            done();
        });
    });

    it('should create product', function (done) {
        createProduct(data, function (product) {
            assert.ok(product);
            assert.equal(product.name, data.name);
            done();
        }, function (err) {
            assert.ok(false);
            done();
        });
    });
});
