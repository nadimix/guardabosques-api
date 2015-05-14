'use strict';

var request = require('supertest');
var app = require('./app');

describe('Requests to /h11/:id', function() {

  it('Respond with json', function(done) {
    request(app)
    .get('/h11/test')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});

describe('Requests to /h20/:id', function() {

  it('Respond with json', function(done) {
    request(app)
    .get('/h2/test')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});

describe('Requests to /s31/:id', function() {

  it('Respond with json', function(done) {
    request(app)
    .get('/s31/test')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});
