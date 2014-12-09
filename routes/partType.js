/*jslint node: true*/
var mongoose = require('mongoose');
var PartType = mongoose.model('PartType');

module.exports = function (app) {
  'use strict';
  app.get('/partType', function (req, res, next) {
    PartType.find({}, function (err, partType) {
      if (err) {
        return next(err);
      }
      return res.json(partType);
    });
  });


  app.post('/partType', function (req, res, next) {
    var partTypeInst = new PartType();
    console.log(req.body);
    partTypeInst.name = req.body.name;
    partTypeInst.caracs = req.body.caracName;

    partTypeInst.save(function (err, partType) {
      if (err) {
        return next(err);
      }
      return res.json(partType);
    });
  });


  app.put('/partType/:id', function (req, res, next) {
    var id = req.param('id'),
      query = PartType.findById(id);

    query.exec(function (err, partType) {
      if (err) {
        return next(err);
      }
      if (!partType) {
        return next(); // 404
      }
      partType.name = req.body.name;
      partType.caracs = req.body.caracName;
      partType.save(function (err,  partType) {
        if (err) {
          return next(err);
        }
        return res.json(partType);
      });
    });
  });


  app.del('/partType/:id', function (req, res, next) {
    var id = req.param('id');

    PartType.findById(id, function (err, partType) {
      if (err) {
        return next(err);
      }
      partType.remove(function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).end();
      });
    });
  });
};

