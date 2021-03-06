'use strict';

var utils = require('../utils');
var User = require('../../models/user');
var assert = require('assert');
var data = {
    name: 'Lucas',
    username: 'lucas',
    password: 'lucas',
    type: 'admin'
}

describe('Users: models', function () {
    describe('#create()', function () {
        it('should get user validation errors', function (done) {
            var user = new User();
            var error = user.validateSync();
            assert.equal(error.errors['username'].message, 'Login do usuário é obrigatório');
            assert.equal(error.errors['password'].message, 'Senha do usuário é obrigatória');
            assert.equal(error.errors['name'].message, 'Nome do usuário é obrigatório');
            assert.equal(error.errors['type'].message, 'Tipo de usuário é obrigatório');
            user.type = 'test';
            error = user.validateSync();
            assert.equal(error.errors['type'].message, 'Tipo de usuário inválido');
            user.name = data.name;
            user.username = data.username;
            user.password = data.password;
            user.type = data.type;
            error = user.validateSync();
            assert.ok(!error);
            done();
        });

        it('should get username already exists error', function (done) {
            var user = new User(data);
            var error = user.validateSync();
            assert.ok(!error);
            User.create(user, function (err, created) {
                assert.ok(!err);
                var user2 = new User(data);
                User.create(user2, function (err, userCreated) {
                    assert.equal(err.errors['username'].message, 'Login já cadastrado');
                    done();
                });
            });
        });
    });
});
