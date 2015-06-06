'use strict';

var express = require('express');
var router = express.Router();
var resourcesCtrl = require('./../controllers/resources');

var protocol = 'http11';

router.param('resource_id', function(req, res, next, id) {
  req.id = id;
  next();
});

router.route('/:resource_id')
  .all(function(req, res, next) {
    next();
  })
  .get(function(req, res) {
    resourcesCtrl.getResource(req.id, protocol, function(err, data) {
      if(err) {
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
