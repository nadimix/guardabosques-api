'use strict';
var resourceModel = require('./../models/resources');

exports.getResource = function(id, protocol, callback) {
    if(id === null) {
      callback(404, null);
    }
    var json = getResourceJSON(id, protocol);
    if(json === null) {
      callback(404, null);
    }
    callback(null, json);
};

function getResourceJSON(id, protocol) {
  var servers = getServers(protocol);
  var resource = getResource(id);
  var numServers = servers.length;

  if(numServers === 0 || resource === null) {
    console.error('Servers.length', numServers, 'resource', resource);
    return null;
  }

  resource.chunks.forEach(function(chunk) {
    chunk.candidates = [];
    var sequence = getRandomSequence(numServers);
    console.log(sequence);
    for(var i = 0; i < numServers; i++) {
      var server = servers[sequence[i]];
      chunk.candidates.push(server + id + '/' + chunk.chunk);
    }
  });
  return resource;
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
