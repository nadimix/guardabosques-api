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

describe('Requests to /resource/:res_id/:protocol', function() {

  it('Respond with json to a HTTP11 request', function(done) {
    request(app)
    .get('/resource/0db391f587a4610373fbb714c05d2456/h11')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

  it('Respond with json to a HTTP2 request', function(done) {
    request(app)
    .get('/resource/0db391f587a4610373fbb714c05d2456/h2')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

  it('Respond with json to a SPDY31 request', function(done) {
    request(app)
    .get('/resource/0db391f587a4610373fbb714c05d2456/s31')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

  it('Bad resource id responds with 404 error', function(done) {
    request(app)
    .get('/resource/0db391f587a4610373fbb714c05d245f6/h11')
    .expect(404, done);
  });

  it('Bad protocol responds with 404 error', function(done) {
    request(app)
    .get('/resource/0db391f587a4610373fbb714c05d2456/h3')
    .expect(404, done);
  });

});

describe('Tests request of OPTIONS method', function() {

  it('Responds with 200 OK', function(done) {
    request(app)
    .options('/')
    .expect(200, done);
  });

});
