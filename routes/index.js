/*jslint node: true, sloppy: true*/
var errors = require('./errors');
var stokageLocation = require('./stokageLocation');
var mongoose = require('mongoose');

module.exports = function (app) {

  // home page
  app.get('/', function (req, res, next) {
    res.render('index.html');
  });

  stokageLocation(app);
  // error handlers
  errors(app);
};
