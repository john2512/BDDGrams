/*jslint node: true*/
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var verifToken = require('./verifToken');

module.exports = function (app) {
  'use strict';
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');

  //Set the Protected routes
  app.use('/carac', verifToken.verify);
  app.use('/part', verifToken.verify);
  app.use('/partType', verifToken.verify);
  app.use('/stokageLocation', verifToken.verify);
  app.use('/user/logout', verifToken.verify);
};
