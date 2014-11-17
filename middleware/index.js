/*jslint node: true, sloppy: true*/
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');
};
