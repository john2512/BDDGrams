/*jslint node: true*/
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Token = mongoose.model('Token');

module.exports = function (app) {
  'use strict';
  app.post('/user/login', function (req, res, next) {
    User.findOne({username: req.body.username}, function (err, user) {
      if (err) {
        return next(err);
      }

      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) {
          next(err);
        }
        if (isMatch) {
          var tokenInst = new Token();
          tokenInst.username = req.body.username;
          tokenInst.save(function (err, token) {
            if (err) {
              return next(err);
            }
            res.json(token);
          });
        }
      });
    });
  });

  app.post('/user/register', function (req, res, next) {
    var userInst = new User();
    userInst.username = req.body.username;
    userInst.password = req.body.password;

    userInst.save(function (err, carac) {
      if (err) {
        return next(err);
      }
      return res.status(200).end();
    });
  });
};
