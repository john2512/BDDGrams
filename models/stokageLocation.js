/*jslint node: true, sloppy: true*/

// StokageLocation model

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  _id: { type: ObjectId },
  location: { type: String, required: true, trim: true},
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

module.exports = mongoose.model('StokageLocation', schema);
