'use strict';

var passport = require('passport');
var response = require('../config/response');

module.exports = function (req, res, next) {
    return passport.authenticate('jwt', { session: false }, function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.send(401, response.setAsFail().setMessage('Não autorizado').get());
        }

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }

            return next();
        });
    })(req, res, next);
}
