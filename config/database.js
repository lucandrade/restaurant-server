'use strict';

var mongoose = require('mongoose');
var config = require('./app');

function database() {
    var me = this;

    me.getConnectionString = function () {
        var data = config.database;
        return data.url + ':' + data.port + '/' + data.name;
    }

    me.getConnection = function () {
        if (mongoose.Promise !== global.Promise) {
            mongoose.Promise = global.Promise;
        }

        return mongoose;
    }

    me.connect = function () {
        me.getConnection().connect(me.getConnectionString());
    }
}

module.exports = new database();
