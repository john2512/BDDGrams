/*jslint node: true, sloppy: true*/
var express = require('express');
var morgan = require('morgan');

module.exports = function (app) {
  app.use(morgan('dev'));

  // expose session to views
  app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
  });
};
