'use strict';

var express = require('express');
var router = express.Router();

router.param('resource_id', function(req, res, next, id) {
  req.id = id;
  next();
});

router.route('/:resource_id')
  .all(function(req, res, next) {
    next();
  })
  .get(function(req, res, next) {
    res.sendStatus(200);
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
