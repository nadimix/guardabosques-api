'use strict';

var request = require('supertest');
var app = require('./../app');

describe('Request to /resources', function() {

  it('Respond with json', function(done) {
      request(app)
      .get('/resources')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

});

describe('Requests to /resource/h11/:id', function() {

  it('Respond with json', function(done) {
    request(app)
    .get('/resource/h11/0db391f587a4610373fbb714c05d2456')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});

describe('Requests to /resource/h2/:id', function() {

  it('Respond with json', function(done) {
    request(app)
    .get('/resource/h2/0db391f587a4610373fbb714c05d2456')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});

describe('Requests to /resource/s31/:id', function() {

  it('Respond with json', function(done) {
    request(app)
    .get('/resource/s31/0db391f587a4610373fbb714c05d2456')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});
