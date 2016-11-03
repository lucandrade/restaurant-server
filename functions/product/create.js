'use strict';

var Product = require('../../models/product');

function createProduct(data, success, fail) {
    Product.create(data, function productCreatedResponse(err, product) {
        if (err) {
            if (err.errors) {
                var messages = {};
                for (var field in err.errors) {
                    if (err.errors[field].message) {
                        messages[field] = err.errors[field].message;
                    }
                }
                if (Object.keys(messages).length > 0) {
                    return fail({
                        messages: messages
                    });
                }
            }

            return fail(err);
        } else {
            return success(product);
        }
    });
}

module.exports = createProduct;
