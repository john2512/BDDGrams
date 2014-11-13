/*jslint node: true, sloppy: true*/
var express = require('express');
var morgan = require('morgan');

module.exports = function (app) {
  app.use(morgan('dev'));

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');
};
