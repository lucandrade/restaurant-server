'use strict';

var jwt = require('jwt-simple');
var config = require('../../config/app');
var generateUserToken = require('../../functions/generateUserToken');
var assert = require('assert');
var data = {
    id: 3423424234
}

describe('generateUserToken: functions', function () {
    it('should generate token', function (done) {
        var token = generateUserToken(data);
        assert.ok(token);
        var decoded = jwt.decode(token, config.secret);
        assert.equal(decoded._id, data.id);
        done();
    });
});
