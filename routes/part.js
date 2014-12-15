/*jslint node: true*/
var mongoose = require('mongoose');
var Part = mongoose.model('Part');

module.exports = function (app) {

  app.get('/part', function (req, res, next) {
    Part.find({}, function (err, part) {
      if (err) {
        return next(err);
      }
      return res.json(part);
    });
  });


  app.post('/part', function (req, res, next) {
    var partInst = new Part();
    partInst.name = req.body.name;
    partInst.partType = req.body.partType;
    partInst.partNumber = req.body.partNumberName;
    partInst.storageLocation = req.body.storageLocation;
    partInst.caracs = req.body.caracName;

    partInst.save(function (err, part) {
      if (err) {
        return next(err);
      }
      return res.json(part);
    });
  });


  app.put('/part/:id', function (req, res, next) {
    var id = req.param('id'),
      query = Part.findById(id);

    query.exec(function (err, part) {
      if (err) {
        return next(err);
      }
      if (!part) {
        return next(); // 404
      }
      part.name = req.body.name;
      part.partType = req.body.partType;
      part.partNumber = req.body.partNumberName;
      part.storageLocation = req.body.storageLocation;
      part.caracs = req.body.caracName;
      part.save(function (err,  part) {
        if (err) {
          return next(err);
        }
        return res.json(part);
      });
    });
  });


  app.del('/part/:id', function (req, res, next) {
    var id = req.param('id');

    Part.findById(id, function (err, part) {
      if (err) {
        return next(err);
      }
      part.remove(function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).end();
      });
    });
  });
};

