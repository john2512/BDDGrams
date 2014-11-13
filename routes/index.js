/*jslint node: true, sloppy: true*/
var errors = require('./errors');
var mongoose = require('mongoose');

module.exports = function (app) {

  // home page
  app.get('/', function (req, res, next) {

  });

  // error handlers
  errors(app);
};
