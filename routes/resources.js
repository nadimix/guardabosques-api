'use strict';

var express = require('express');
var router = express.Router();
var resources = require('./../controllers/resources');

router.route('/')
  .all(function(req, res, next) {
    next();
  })
  .get(function(req, res) {
    resources.getManifest(function(err, data) {
      if(err) {
        console.error(err);
        if(err === 404) {
          res.sendStatus(404);
        } else {
          res.sendStatus(500);
        }
      } else {
        res.json(data);
      }
    });
  })
  .put(function(req, res, next) {
    next(new Error('not implemented'));
  })
  .post(function(req, res, next) {
    next(new Error('not implemented'));
  })
  .delete(function(req, res, next) {
    next(new Error('not implemented'));
  });

module.exports = router;
