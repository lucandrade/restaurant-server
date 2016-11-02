'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var config = require('../config/app');
var uniqueValidator = require('mongoose-unique-validator');
var types = {
    values: config.userType,
    message: 'Tipo de usuário inválido'
}

var UserSchema = new Schema({
    username: { type: String, unique: true, required: [true, 'Login do usuário é obrigatório'] },
    password: { type: String, required: [true, 'Senha do usuário é obrigatória'] },
    name: { type: String, required: [true, 'Nome do usuário é obrigatório'] },
    status: { type: Boolean, default: true },
    type: { type: String, enum: types, required: [true, 'Tipo de usuário é obrigatório'] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

UserSchema.plugin(uniqueValidator, { message: 'Login já cadastrado' });

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
