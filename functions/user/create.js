'use strict';

var User = require('../../models/user');

function createUser(data, success, fail) {
    User.create(data, function userCreatedResponse(err, user) {
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
            success(user);
        }
    });
}

module.exports = createUser;
