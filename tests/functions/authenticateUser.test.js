'use strict';

var utils = require('../utils');
var createUser = require('../../functions/user/create');
var authenticateUser = require('../../functions/user/authenticate');
var assert = require('assert');
var data = {
    name: 'Lucas',
    username: 'lucas',
    password: 'lucas',
    type: 'admin'
}

describe('authenticateUser: functions', function () {
    it('should get user not found error', function (done) {
        createUser(data, function (user) {
            authenticateUser('teste', 'teste', function (user) {
                assert.ok(false);
                done();
            }, function (err) {
                assert.equal('Login não encontrado', err);
                done();
            });
        }, function (err) {
            assert.ok(false);
            done();
        });
    });

    it('should get invalid password error', function (done) {
        createUser(data, function (user) {
            authenticateUser(data.username, 'teste', function (user) {
                assert.ok(false);
                done();
            }, function (err) {
                assert.equal('Senha inválida', err);
                done();
            });
        }, function (err) {
            assert.ok(false);
            done();
        });
    });

    it('should get user logged', function (done) {
        createUser(data, function (user) {
            authenticateUser(data.username, data.password, function (user) {
                assert.ok(user);
                done();
            }, function (err) {
                assert.ok(false);
                done();
            });
        }, function (err) {
            assert.ok(false);
            done();
        });
    });
});
