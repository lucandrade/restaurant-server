'use strict';

var express = require('express');
var database = require('./config/database');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var passport	= require('passport');

database.connect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/', routes);
app.use('/user', users);

require('./auth/passport')(passport);
require('./config/error').handle(app);

module.exports = app;
