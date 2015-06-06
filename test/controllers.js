'use strict';

var assert = require('chai').assert;
var resourcesCtrl = require('./../controllers/resources');

describe('Tests getSequenceSize3', function() {

  it('Returns 000', function() {
    assert.equal(resourcesCtrl._getSequenceSize3(0), '000');
  });
  
  it('Returns 001', function() {
    assert.equal(resourcesCtrl._getSequenceSize3(1), '001');
  });

  it('Returns 025', function() {
    assert.equal(resourcesCtrl._getSequenceSize3(25), '025');
  });

  it('Returns 999', function() {
    assert.equal(resourcesCtrl._getSequenceSize3(999), '999');
  });

  it('Returns null when number > 999', function() {
    assert.equal(resourcesCtrl._getSequenceSize3(1000), null);
  });

});

describe('Tests getRandomSequence', function() {

  it('Should generate a random sequence of length 10', function() {
    assert.equal(resourcesCtrl._getRandomSequence(10).length, 10);
  });

  it('All values should be different', function() {
    var sequence = resourcesCtrl._getRandomSequence(100);
    var result = true;
    for(var i = 0; i < sequence.length; i ++) {
      for(var j = 0; j < sequence.length; j++) {
        if(i !== j && sequence[i] === sequence[j]) {
          result = false;
        }
      }
    }
    assert.equal(result, true);
  });

});

describe('Tests insertResource', function() {

  it('Should return null due to numElements > 1000', function() {
    assert.equal(resourcesCtrl.insertResource('123456', 'test_resource', 1001), null);
  });

  it('Should return a JSON with the n chunks', function() {
    var numElements = 34;
    var json = resourcesCtrl.insertResource('123456', 'test_resource', numElements);
    assert.equal(json.chunks.length, numElements);
  });

});