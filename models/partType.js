/*jslint node: true, sloppy: true*/

// PartType model

var mongoose = require('mongoose');
var Carac = require('./carac');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  name: { type: String, required: true, trim: true},
  caracs: {type: [String], trim: true},
  created: { type: Date, required: false},
  modified: {type: Date, required: false}
});

//Validation verifi si caracs existe dans la collection caracs
schema.path('caracs').validate(function (caracs, callback) {
  Carac.count({name: {$in: caracs}}, function (err, count) {
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

module.exports = mongoose.model('PartType', schema);
