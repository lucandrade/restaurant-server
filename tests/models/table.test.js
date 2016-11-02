'use strict';

var utils = require('../utils');
var Table = require('../../models/table');
var assert = require('assert');
var data = {
    name: 'Mesa 1'
}

describe('Tables: models', function () {
    describe('#create()', function () {
        it('should get table validation errors', function (done) {
            var table = new Table();
            var error = table.validateSync();
            assert.equal(error.errors['name'].message, 'Nome da mesa é obrigatório');
            done();
        });

        it('should create table', function (done) {
            var table = new Table(data);
            var error = table.validateSync();
            assert.ok(!error);
            Table.create(table, function (err, created) {
                assert.ok(!err);
                assert.equal(created.name, data.name);
                done();
            });
        });

        it('should get name already exists error', function (done) {
            var table = new Table(data);
            var error = table.validateSync();
            assert.ok(!error);
            Table.create(table, function (err, created) {
                assert.ok(!err);
                var table2 = new Table(data);
                Table.create(table2, function (err, userCreated) {
                    assert.equal(err.errors['name'].message, 'Nome da mesa já cadastrado');
                    done();
                });
            });
        });
    });
});
