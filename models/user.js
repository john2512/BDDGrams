/*jslint node: true*/

// User model

var mongoose = require('mongoose'),
  bcryptjs = require('bcryptjs'),
  SALT_WORK_FACTOR = 10;

var schema = mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true}
});

//salt and hash the password before saving
schema.pre('save', function (next) {
  'use strict';
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  //generate the salt with bcryptjs
  bcryptjs.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
    //generate the hash with the salt previously created
    bcryptjs.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      //change the password for the salted and hashed password
      user.password = hash;
      next();
    });
  });
});

//check if the password in the schema match with the argument password
schema.methods.comparePassword = function (password, callBack) {
  'use strict';
  bcryptjs.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return callBack(err);
    }

    callBack(null, isMatch);
  });
};

module.exports = mongoose.model('User', schema);
