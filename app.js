'use strict';

require('pmx').init();
var express = require('express');
var resources = require('./routes/resources');
var resource = require('./routes/resource');

var logger = require('morgan');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 4430);
app.use(logger('dev'));

app.use(methodOverride());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Expose-Headers', 'Content-Length');

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

app.use('/resources', resources);
app.use('/resource', resource);

// error handling middleware should be loaded after the loading the routes
if ('development' === app.get('env')) {
  app.use(errorHandler());
}

module.exports = app;
