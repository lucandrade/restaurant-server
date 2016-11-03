'use strict';

var utils = require('../utils');
var createTable = require('../../functions/table/create');
var assert = require('assert');
var data = {
    name: 'Mesa 1'
}

describe('createTable: functions', function () {
    it('should get table validation errors', function (done) {
        createTable({}, function (table) {
            assert.ok(false);
            done();
        }, function (err) {
            assert.equal(err.messages['name'], 'Nome da mesa é obrigatório');
            done();
        });
    });

    it('should create table', function (done) {
        createTable(data, function (table) {
            assert.ok(table);
            assert.equal(table.name, data.name);
            done();
        }, function (err) {
            assert.ok(false);
            done();
        });
    });
});
