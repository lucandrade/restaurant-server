'use strict';

var database = require('../config/database');
var createUser = require('../functions/createUser');

database.connect();

function exit() {
    database.getConnection().disconnect();
}

createUser({
    username: 'admin',
    name: 'Admin',
    password: 'admin',
    type: 'admin'
}, function (user) {
    console.log('usuário salvo');
    console.log(user);
    exit();
}, function (err) {
    console.log('erro ao criar usuário');
    console.log(err);
    exit();
});
