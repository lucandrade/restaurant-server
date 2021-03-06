'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var TableSchema = new Schema({
    name: { type: String, unique: true, required: [true, 'Nome da mesa é obrigatório'] },
    free: { type: Boolean, default: true },
    active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

TableSchema.plugin(uniqueValidator, { message: 'Nome da mesa já cadastrado' });

TableSchema.pre('save', function (next) {
    var table = this;
    if (!this.isNew) {
        table.updated_at = Date.now();
    }
    return next();
});

module.exports = mongoose.model('Table', TableSchema);
