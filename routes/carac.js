/*jslint node: true*/
var mongoose = require('mongoose');
var Carac = mongoose.model('Carac');

module.exports = function (app) {
  'use strict';
  app.get('/carac', function (req, res, next) {
    Carac.find({}, function (err, carac) {
      if (err) {
        return next(err);
      }
      return res.json(carac);
    });
  });


  app.post('/carac', function (req, res, next) {
    var caracInst = new Carac();
    caracInst.name = req.body.name;

    caracInst.save(function (err, carac) {
      if (err) {
        return next(err);
      }
      return res.json(carac);
    });
  });


  app.put('/carac/:id', function (req, res, next) {
    var id = req.param('id'),
      query = Carac.findById(id);

    query.exec(function (err, carac) {
      if (err) {
        return next(err);
      }
      if (!carac) {
        return next(); // 404
      }
      carac.name = req.body.name;
      carac.save(function (err,  carac) {
        if (err) {
          return next(err);
        }
        return res.json(carac);
      });
    });
  });


  app.del('/carac/:id', function (req, res, next) {
    var id = req.param('id');

    Carac.findById(id, function (err, carac) {
      if (err) {
        return next(err);
      }
      carac.remove(function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).end();
      });
    });
  });
};
