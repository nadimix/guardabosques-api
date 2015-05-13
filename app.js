'use strict';

var express = require('express');
var http11 = require('./routes/http11');
var http2 = require('./routes/http2');
var spdy31 = require('./routes/spdy31');

var logger = require('morgan');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 443);
app.use(logger('dev'));

app.use(methodOverride());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Expose-Headers', 'Content-Length');

  // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

app.use('/h11', http11);
app.use('/h2', http2);
app.use('/s31', spdy31);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

module.exports = app;