'use strict';

var Table = require('../../models/table');

function updateTable(id, data, success, fail) {
    Table.update({
        _id: id
    }, { $set: data }, { new: true }, function tableUpdatedResponse(err, updated) {
        if (err) {
            if (err.errors) {
                var messages = {};
                for (var field in err.errors) {
                    if (err.errors[field].message) {
                        messages[field] = err.errors[field].message;
                    }
                }
                if (Object.keys(messages).length > 0) {
                    return fail({
                        messages: messages
                    });
                }
            }

            return fail(err);
        } else {
            Table.findById(id, function tableFindByIdResponse(err, table) {
                if (err) {
                    return fail(err);
                } else {
                    return success(table);
                }
            });
        }
    });
}

module.exports = updateTable;
