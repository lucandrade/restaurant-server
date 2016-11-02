'use strict';

var Table = require('../models/table');

function createTable(data, success, fail) {
    Table.create(data, function tableCreatedResponse(err, table) {
        if (err) {
            if (err.errors) {
                var messages = {};
                for (var field in err.errors) {
                    if (err.errors[field].message) {
                        messages[field] = err.errors[field].message;
                    }
                }
                if (Object.keys(messages).length > 0) {
                    return fail(messages);
                }
            }

            return fail(err);
        } else {
            return success(table);
        }
    });
}

module.exports = createTable;
