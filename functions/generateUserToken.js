'use strict';

var jwt = require('jwt-simple');
var config = require('../config/app');

function generateUserToken (user) {
    var token = jwt.encode({
        _id: user.id,
        created_date: Date.now()
    }, config.secret);
    return token;
}

module.exports = generateUserToken;
