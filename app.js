'use strict';

var express = require('express');
var database = require('./config/database');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var app = express();
var passport = require('passport');
var path = require('path');

database.connect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/user', users);
app.use('/product', products);

require('./auth/passport')(passport);
require('./config/error').handle(app);

module.exports = app;
