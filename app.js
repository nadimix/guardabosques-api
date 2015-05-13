'use strict';

var express = require('express');
var app = express();

var http11 = require('./routes/http11');
var http2 = require('./routes/http2');
var spdy31 = require('./routes/spdy31');

app.use('/h11', http11);
app.use('/h2', http2);
app.use('/s31', spdy31);

module.exports = app;
