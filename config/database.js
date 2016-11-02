var mongoose = require('mongoose');
var config = require('./app');

module.exports = {
    connect: function () {
        var data = config.database;
        mongoose.connect(data.url + ':' + data.port + '/' + data.name);
    }
}
