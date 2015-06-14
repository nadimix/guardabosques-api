'use strict';

var express = require('express');
var router = express.Router();
var resourcesCtrl = require('./../controllers/resources');

router.get('/', resourcesCtrl.getResources);

module.exports = router;
