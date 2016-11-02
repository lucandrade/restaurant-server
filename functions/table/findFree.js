'use strict';

var Table = require('../../models/table');

function findFreeTable(success, fail) {
    Table.find({
        free: true,
        active: true
    }).sort({name:'asc'}).exec(function tableFindFreeResponse(err, data) {
        if (err) {
            return fail(err);
        } else {
            return success(data);
        }
    });
}

module.exports = findFreeTable;
