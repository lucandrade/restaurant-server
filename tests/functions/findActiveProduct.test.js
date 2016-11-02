'use strict';

var utils = require('../utils');
var createProduct = require('../../functions/product/create');
var findProduct = require('../../functions/product/findActive');
var assert = require('assert');
var data = [
    {
        name: 'mesa 1'
    },
    {
        name: 'Mesa 2',
    },
    {
        name: 'Mesa 3',
        active: false,
    },
    {
        name: 'a Mesa 4'
    },
    {
        name: 'b Mesa 5'
    }
];

function createProducts(cb) {
    var products = 0;
    for (var i in data) {
        createProduct(data[i], function (product) {
            products++;
            if (products == data.length) {
                cb();
            }
        }, function (err) {
            throw new Error('Erro ao criar mesa');
        });
    }
}

describe('findProduct: functions', function () {
    it('should get active product', function (done) {
        createProducts(function () {
            findProduct(function (products) {
                assert.ok(products);
                assert.equal(products.length, 4);
                done();
            }, function (err) {
                assert.ok(false);
                done();
            });
        });
    });
});
