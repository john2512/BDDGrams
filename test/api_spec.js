/*jslint node: true, sloppy: true*/
var frisby = require('frisby');
var crypto = require('crypto');

var md5sum = crypto.createHash('md5');
md5sum.update(Math.random() * 1000);


frisby.create('Post the /locations locations')
  .post('http://localhost:3000/locations', {
    location: md5sum
  })
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON('0', {
    '_id': null,
    location: md5sum
  })
  .expectJSONTypes('0', {
    '_id': null,
    location: String,
    created: String,
    modified: String,
    '__v': Number
  })
  .toss();

frisby.create('Get the /locations route')
  .get('http://localhost:3000/locations')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON('0', null)
  .toss();
