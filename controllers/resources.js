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
      chunk.candidates.push(server + chunk.chunk);
    });
  });
  return resource;
}

function getServers(protocol) {
  // TODO fetch info from db
  switch(protocol) {
    case 'http2':
      return ['https://ip:4441/', 'https://ip:4442/', 'https://ip:4443/'];
    case 'spdy31':
      return ['https://ip:4451/', 'https://ip:4452/', 'https://ip:4453/'];
    default: // http11
      return ['https://ip:4431/', 'https://ip:4432/', 'https://ip:4433/'];
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
