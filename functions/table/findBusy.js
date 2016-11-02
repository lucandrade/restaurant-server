'use strict';

var Table = require('../../models/table');

function findBusyTable(success, fail) {
    Table.find({
        free: false,
        active: true
    }).sort({name:'asc'}).exec(function tableFindBusyResponse(err, data) {
        if (err) {
            return fail(err);
        } else {
            return success(data);
        }
    });
}

module.exports = findBusyTable;
