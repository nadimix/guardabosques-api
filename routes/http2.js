'use strict';

var express = require('express');
var router = express.Router();
var resources = require('./../controllers/resources');

var protocol = 'http2';

router.param('resource_id', function(req, res, next, id) {
  req.id = id;
  next();
});

router.route('/:resource_id')
  .all(function(req, res, next) {
    next();
  })
  .get(function(req, res) {
    resources.getResource(req.id, protocol, function(err, data) {
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
