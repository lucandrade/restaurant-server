'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: { type: String, required: [true, 'Nome do produto é obrigatório'] },
    description: { type: String },
    active: { type: Boolean, default: true },
    price: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

ProductSchema.pre('save', function (next) {
    var product = this;
    if (!this.isNew) {
        product.updated_at = Date.now();
    }
    return next();
});

module.exports = mongoose.model('Product', ProductSchema);
