'use strict';

var Product = require('../../models/product');

function findProduct(success, fail) {
    Product.find({
        active: true
    }).sort({name:'asc'}).exec(function productFindResponse(err, data) {
        if (err) {
            return fail(err);
        } else {
            return success(data);
        }
    });
}

module.exports = findProduct;
