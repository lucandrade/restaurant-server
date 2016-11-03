'use strict';

var utils = require('../utils');
var createTable = require('../../functions/table/create');
var updateTable = require('../../functions/table/update');
var assert = require('assert');
var data = {
    name: 'Mesa 1'
}

var updateData = {
    name: 'alterada'
}

describe('updateTable: functions', function () {
    it('should update table', function (done) {
        createTable(data, function (table) {
            assert.ok(table);
            assert.equal(table.name, data.name);
            updateTable(table._id, updateData, function (updated) {
                assert.equal(updated.name, updateData.name);
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
