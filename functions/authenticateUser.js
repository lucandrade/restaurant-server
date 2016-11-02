'use strict';

var User = require('../models/user');

function authenticateUser (username, password, success, fail) {
    User.findOne({
        username: username
    }, function userAuthenticateResponse(err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            return fail('Login não encontrado');
        }

        user.comparePassword(password, function userAuthenticateCompare(err, isMatch) {
            if (err) {
                throw err;
            }

            if (isMatch) {
                return success(user);
            }

            return fail('Senha inválida');
        });
    });
}

module.exports = authenticateUser;
