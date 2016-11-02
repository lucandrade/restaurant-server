'use strict';

var Table = require('../../models/table');

function findActiveTable(success, fail) {
    Table.find({
        active: true
    }).sort({name:'asc'}).exec(function tableFindActiveResponse(err, data) {
        if (err) {
            return fail(err);
        } else {
            return success(data);
        }
    });
}

module.exports = findActiveTable;
