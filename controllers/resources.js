'use strict';

exports.getResource = function(id, protocol, callback) {
    if(id === null) {
      callback("Id shouldn't be null", null);
    }
    callback(null, getResourceJSON(id, protocol));
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

function getResource() {
  // TODO fetch resource from db (getResource(id))
  return {
    id: '0db391f587a4610373fbb714c05d2456',
    name: 'debian-7.8.0-amd64-i386-netinst.iso',
    chunks: [
      {
        id: 0,
        chunk: 'debian-7.8.0-amd64-i386-netinst.iso.aa'
      }, 
      {
        id: 1,
        chunk: 'debian-7.8.0-amd64-i386-netinst.iso.ab'
      },
      {
        id: 2,
        chunk: 'debian-7.8.0-amd64-i386-netinst.iso.ac'
      },
      {
        id: 3,
        chunk: 'debian-7.8.0-amd64-i386-netinst.iso.ad'
      },
      {
        id: 4,
        chunk: 'debian-7.8.0-amd64-i386-netinst.iso.ae'
      },
      {
        id: 5,
        chunk: 'debian-7.8.0-amd64-i386-netinst.iso.af'
      },
      {
        id: 6,
        chunk: 'debian-7.8.0-amd64-i386-netinst.iso.ag'
      },
      {
        id: 7,
        chunk: 'debian-7.8.0-amd64-i386-netinst.iso.ah'
      },
      {
        id: 8,
        chunk: 'debian-7.8.0-amd64-i386-netinst.iso.ai'
      },
      {
        id: 9,
        chunk: 'debian-7.8.0-amd64-i386-netinst.iso.aj'
      }
    ]
  };
}
