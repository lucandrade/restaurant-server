'use strict';

process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'restaurant_test';

var database = require('../config/database');
var mongoose = database.getConnection();
var databaseUrl = database.getConnectionString();

beforeEach(function (done) {
    function clearDB() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function() {});
        }
        return done();
    }

    if (mongoose.connection.readyState == 0) {
        mongoose.connect(databaseUrl, function (err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    } else {
        return clearDB();
    }
});

afterEach(function (done) {
    mongoose.disconnect();
    return done();
});
