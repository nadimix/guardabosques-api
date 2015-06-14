'use strict';
var resourceModel = require('./../models/resources');

exports.get = function(req, res) {
  getResourceJSON(req.id, req.httpProtocol, function(err, data) {
    res.status(err ? 404 : 200).json({
      error: err ? true : null,
      errorMessage: err ? err : null,
      data: data
    });
  });
};

exports.getManifest = function(callback) {
  var json = resourceModel.getManifest;
  if(json === null) {
    callback(404, null);
  } else {
    callback(null, json);
  }
};

exports.insertResource = function(id, name, numElements) {
  if(numElements > 1000) {
    return null;
  }

  var resource = {};
  resource.id = id;
  resource.name = name;
  resource.chunks = [];
  var chunk;
  for(var i = 0; i < numElements; i++) {
    chunk = {};
    chunk.id = i;
    chunk.chunk = name + '.' + this._getSequenceSize3(i);
    resource.chunks.push(chunk);
  }
  return resource;
};

function getResourceJSON(id, protocol, callback) {
  checkProtocol(protocol, function(err) {
    if(err) {
      callback(err, null);
    }
  });

  var servers = getServers(protocol);
  var resource = getResource(id);
  var numServers = servers.length;

  if(numServers === 0) {
    callback('Servers not found', null);
  } else if (resource === null) {
    callback('Resource Not found', null);
  }

  resource.chunks.forEach(function(chunk) {
    chunk.candidates = [];
    var sequence = getRandomSequence(numServers);
    for(var i = 0; i < numServers; i++) {
      var server = servers[sequence[i]];
      chunk.candidates.push(server + id + '/' + chunk.chunk);
    }
  });

  callback(null, resource);
}

function checkProtocol(protocol, callback) {
  if(protocol !== 'h11' && protocol !== 'h2' && protocol !== 's31') {
    callback('Bad protocol');
  } else {
    callback(null);
  }
}

function getRandomSequence(numServers) {
  var sequence = [];
  while(sequence.length < numServers) {
    var randomIndex = Math.floor(Math.random() * numServers);
    if (!checkDuplicates(sequence, randomIndex)) {
      sequence.push(randomIndex);
    }
  }
  return sequence;
}

function checkDuplicates(sequence, randomIndex) {
  for (var i = 0; i < sequence.length; i++) {
    if(sequence[i] === randomIndex) {
      return true;
    }
  }
  return false;
}

function getServers(protocol) {
  // TODO fetch info from db
  var servers = ['46.101.40.237', '178.62.65.116', '46.101.41.32'];
  var candidates = [];
  switch(protocol) {
    case 'http2':
      servers.forEach(function(server) {
        candidates.push('https://' + server + ':4432/');
      });
      return candidates;
    case 'spdy31':
      servers.forEach(function(server) {
        candidates.push('https://' + server + ':4433/');
      });
      return candidates;
    default: // http11
      servers.forEach(function(server) {
        candidates.push('https://' + server + ':4431/');
      });
      return candidates;
  }
}

function getResource(id) {
  var resources = resourceModel.getResources;
  for (var i = 0; i < resources.length; i++) {
    if(resources[i].id === id) {
      return resources[i];
    }
  }
  return null;
}

function getSequenceSize3(num) {
    if(num > 999) {
      return null;
    }
    var size = 3;
    var sequence = "000" + num;
    return sequence.substr(sequence.length-size);
}

// Exports private functions when run unit tests
if(process.env.NODE_ENV === 'test') {
  exports._getRandomSequence = getRandomSequence;
  exports._getSequenceSize3 = getSequenceSize3;
}
