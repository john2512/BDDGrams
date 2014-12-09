/*jslint node: true, sloppy: true*/
var frisby = require('frisby');
var crypto = require('crypto');

var md5sum = crypto.createHash('md5').update((Math.random() * 1000).toString()).digest('hex');
var md5sum2 = crypto.createHash('md5').update((Math.random() * 1000).toString()).digest('hex');

//test block for Location route
//Post
var postTest = frisby.create('Post the /locations locations')
  .post('http://localhost:3000/locations', {
    location: md5sum
  }, {json: true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    location: md5sum
  })
  .expectJSONTypes({
    '_id': String,
    location: String,
    created: String,
    modified: String,
    '__v': Number
  });

//Put
postTest.afterJSON(function (json) {
  frisby.create('Put the /locations route')
    .put('http://localhost:3000/locations/' + json._id, {
      location: md5sum2
    }, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
      location: md5sum2
    })
    .expectJSONTypes({
      '_id': String,
      location: String,
      created: String,
      modified: String,
      '__v': Number
    })
    .toss();
});
//Delete
postTest.afterJSON(function (json) {
  frisby.create('Delet the /locations route')
    .delete('http://localhost:3000/locations/' + json._id, {
      location: md5sum2
    }, {json: true})
    .expectStatus(200)
    .toss();
}).toss();
//Get
frisby.create('Get the /locations route')
  .get('http://localhost:3000/locations')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes('*', {
    '_id': String,
    location: String,
    created: String,
    modified: String,
    '__v': Number
  })
  .toss();
