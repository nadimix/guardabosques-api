'use strict';

var express = require('express');
var router = express.Router();
var resourcesCtrl = require('./../controllers/resources');


router.param('resourceId', function(req, res, next, id) {
  req.id = id;
  next();
});

router.param('protocol', function(req, res, next, protocol) {
  req.httpProtocol = protocol;
  next();
});

router.get('/:resourceId/:protocol', resourcesCtrl.getResource);

module.exports = router;
