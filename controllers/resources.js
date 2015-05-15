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

  if(servers.length === 0 || resource === null) {
  	console.error('Servers.length', servers.length, 'resource', resource);
    return null;
  }

  resource.chunks.forEach(function(chunk) {
    chunk.candidates = [];
    servers.forEach(function(server) {
      chunk.candidates.push(server + id + '/' + chunk.chunk);
    });
  });
  return resource;
}

function getServers(protocol) {
  // TODO fetch info from db
  switch(protocol) {
    case 'http2':
      return ['https://46.101.40.237:4432/', 'https://178.62.65.116:4432/', 'https://46.101.41.32:4432/'];
    case 'spdy31':
      return ['https://46.101.40.237:4433/', 'https://178.62.65.116:4433/', 'https://46.101.41.32:4433/'];
    default: // http11
      return ['https://46.101.40.237:4431/', 'https://178.62.65.116:4431/', 'https://46.101.41.32:4431/'];
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
