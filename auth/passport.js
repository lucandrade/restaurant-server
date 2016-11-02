'use strict';

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user');
var config = require('../config/app');

module.exports = function (passport) {
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
    var opts = {};
    opts.secretOrKey = config.secret;
    // Configura para buscar token do header
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({
            _id: jwt_payload._id
        }, function(err, user) {
            if (err) {
                throw err;
            }

            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
}
