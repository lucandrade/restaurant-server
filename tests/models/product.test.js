'use strict';

var utils = require('../utils');
var Product = require('../../models/product');
var assert = require('assert');
var data = {
    name: 'Produto',
    price: 15.4
}

describe('Products: models', function () {
    describe('#create()', function () {
        it('should get product validation errors', function (done) {
            var product = new Product();
            var error = product.validateSync();
            assert.equal(error.errors['name'].message, 'Nome do produto é obrigatório');
            done();
        });

        it('should save product', function (done) {
            var product = new Product(data);
            var error = product.validateSync();
            assert.ok(!error);
            Product.create(product, function (err, created) {
                assert.ok(!err);
                assert.equal(created.name, data.name);
                assert.equal(created.price, data.price);
                done();
            });
        });
    });
});
