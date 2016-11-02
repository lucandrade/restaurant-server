'use strict';

var utils = require('../utils');
var createTable = require('../../functions/table/create');
var findFreeTable = require('../../functions/table/findFree');
var assert = require('assert');
var data = [
    {
        name: 'mesa 1'
    },
    {
        name: 'Mesa 2',
        free: false,
    },
    {
        name: 'Mesa 3',
        active: false,
    },
    {
        name: 'a Mesa 4'
    },
    {
        name: 'b Mesa 5'
    }
];

function createTables(cb) {
    var tables = 0;
    for (var i in data) {
        createTable(data[i], function (table) {
            tables++;
            if (tables == data.length) {
                cb();
            }
        }, function (err) {
            throw new Error('Erro ao criar mesa');
        });
    }
}

describe('findFreeTable: functions', function () {
    it('should get table validation errors', function (done) {
        createTables(function () {
            findFreeTable(function (tables) {
                assert.ok(tables);
                assert.equal(tables.length, 3);
                assert.equal(tables[0].name, 'a Mesa 4');
                done();
            }, function (err) {
                assert.ok(false);
                done();
            });
        });
    });
});
