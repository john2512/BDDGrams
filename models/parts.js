/*jslint node: true, sloppy: true*/

// Parts model

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  _id: { type: ObjectId },
  name: { type: String, required: true, trim: true},
  partType: { type: String, required: true, trim: true},
  partNumber: [{
    name: {type: String, trim: true},
    value: {type: String, trim: true}
  }],
  storageLocation: [{
    location: {type: String, trim: true},
    quantite: {type: String, trim: true}
  }],
  caracs: [{
    caracName: {type: String, trim: true},
    value: {type: String, trim: true}
  }],
  created: { type: Date, required: true},
  modified: {type: Date, required: true}
});


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

module.exports = mongoose.model('Comment', schema);
