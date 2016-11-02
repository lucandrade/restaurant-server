'use strict';

var utils = require('../utils');
var createUser = require('../../functions/user/create');
var assert = require('assert');
var data = {
    name: 'Lucas',
    username: 'lucas',
    password: 'lucas',
    type: 'admin'
}

describe('createUser: functions', function () {
    it('should get user validation errors', function (done) {
        createUser({}, function (user) {
            assert.ok(false);
            done();
        }, function (err) {
            assert.equal(err['username'], 'Login do usuário é obrigatório');
            assert.equal(err['password'], 'Senha do usuário é obrigatória');
            assert.equal(err['name'], 'Nome do usuário é obrigatório');
            assert.equal(err['type'], 'Tipo de usuário é obrigatório');
            done();
        });
    });

    it('should get invalid user type error', function (done) {
        createUser({
            type: 'teste'
        }, function (user) {
            assert.ok(false);
            done();
        }, function (err) {
            assert.equal(err['type'], 'Tipo de usuário inválido');
            done();
        });
    });

    it('should create user', function (done) {
        createUser(data, function (user) {
            assert.ok(user);
            user.comparePassword(data.password, function (err, isMatch) {
                assert.ok(isMatch);
                done();
            });
        }, function (err) {
            assert.ok(false);
            done();
        });
    });
});
