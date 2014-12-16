/*jslint node: true, sloppy: true*/
var errors = require('./errors');
var stokageLocation = require('./stokageLocation');
var partType = require('./partType');
var carac = require('./carac');
var part = require('./part');
var user = require('./user');
var mongoose = require('mongoose');

module.exports = function (app) {

  // home page
  app.get('/', function (req, res, next) {
    res.render('index.html');
  });

  stokageLocation(app);
  partType(app);
  carac(app);
  user(app);
  part(app);
  // error handlers
  errors(app);
};
