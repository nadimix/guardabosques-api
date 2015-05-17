'use strict';

var request = require('supertest');
var app = require('./app');

describe('Requests to /h11/:id', function() {

  it('Respond with json', function(done) {
    request(app)
    .get('/h11/0db391f587a4610373fbb714c05d2456')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});

describe('Requests to /h20/:id', function() {

  it('Respond with json', function(done) {
    request(app)
    .get('/h2/0db391f587a4610373fbb714c05d2456')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});

describe('Requests to /s31/:id', function() {

  it('Respond with json', function(done) {
    request(app)
    .get('/s31/0db391f587a4610373fbb714c05d2456')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});
