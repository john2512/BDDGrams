/*jslint node: true*/

// Token model

var mongoose = require('mongoose'),
  crypto = require('crypto'),
  TOKEN_LENGTH = 32;

var schema = mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  token: {type: String, required: false},
  createdAt: {type: Date, required: false, expires: '12h'}
});

//Generate a TOKEN_LENGTH sized token in hexa for the authentication.
function generateToken(callback) {
  'use strict';
  crypto.randomBytes(TOKEN_LENGTH, function (err, token) {
    if (err) {
      return callback(err);
    }

    if (token) {
      return callback(null, token.toString('hex'));
    }

    callback(new Error('Token generation failed'));
  });
}

//Populate the createdAt and the token field before saving.
schema.pre('save', function (next) {
  'use strict';
  var tokenInst = this;
  generateToken(function (err, token) {
    if (err) {
      return next(err);
    }
    tokenInst.token = token;
    tokenInst.createdAt = new Date();
    next();
  });
});

module.exports = mongoose.model('Token', schema);
