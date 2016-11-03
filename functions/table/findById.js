'use strict';

var Table = require('../../models/table');

function findById(id, success, fail) {
    Table.findById(id, function tableFindByIdResponse(err, table) {
        if (err) {
            return fail(err);
        } else {
            return success(table);
        }
    });
}

module.exports = findById;
