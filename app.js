'use strict';

var express = require('express');
var database = require('./config/database');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var routes = require('./routes/index');
var app = express();

database.connect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

require('./config/error').handle(app);

module.exports = app;
