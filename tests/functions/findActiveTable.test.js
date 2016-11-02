'use strict';

var utils = require('../utils');
var createTable = require('../../functions/table/create');
var findActiveTable = require('../../functions/table/findActive');
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

describe('findActiveTable: functions', function () {
    it('should get active tables', function (done) {
        createTables(function () {
            findActiveTable(function (tables) {
                assert.ok(tables);
                assert.equal(tables.length, 4);
                done();
            }, function (err) {
                assert.ok(false);
                done();
            });
        });
    });
});
