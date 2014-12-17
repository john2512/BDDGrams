/*jslint node: true, sloppy: true*/

// Part model

var mongoose = require('mongoose');
var Carac = require('./carac');
var PartType = require('./partType');
var StorageLocation = require('./stokageLocation');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  name: { type: String, required: true, trim: true},
  partType: { type: String, required: true, trim: true},
  partNumber: [{
    name: {type: String, trim: true},
    value: {type: String, trim: true}
  }],
  storageLocation: [{
    location: {type: String, trim: true},
    quantite: {type: Number, trim: true}
  }],
  caracs: [{
    caracName: {type: String, trim: true},
    value: {type: String, trim: true}
  }],
  created: { type: Date, required: false},
  modified: {type: Date, required: false}
});

//Validation verifi si partType existe dans la collection partType
schema.path('partType').validate(function (partType, callback) {
  PartType.count({name: {$in: partType}}, function (err, count) {
    if (err) {
      throw err;
    }
    console.log('Matching partType : ' + count);
    callback(count >= partType.length);
  });
}, 'Ce type n\'existe pas');


//Validation verifi si storageLocation existe dans la collection storageLocation
schema.path('storageLocation').validate(function (storageLocation, callback) {
  StorageLocation.count({location: {$in: storageLocation}}, function (err, count) {
    if (err) {
      throw err;
    }
    console.log('Matching storageLocation : ' + count);
    callback(count >= caracs.length);
  });
}, 'Cette localisation n\'existe pas');

//Validation vérifie si les carac  existe dans les carac de la collection partType pour ce type
schema.path('partType').validate(function (partType,callback){
   PartType.count({name: {$in: caracs}}, function (err, count) {
    if (err) {
      throw err;
    }
    console.log('Matching caracs : ' + count);
    callback(count >= caracs.length);
  });
}, 'Cette caractéristique n\'existe pas');



//Change the update whenever the methode save is call on the object
//Created is specified if the object is new
schema.pre('save', function (next) {
  var now = new Date();
  this.modified = now;
  if (!this.created) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Part', schema);
