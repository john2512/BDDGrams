/*jslint node: true, sloppy: true*/
//CRUD REST API logic for the locations colection
var mongoose = require('mongoose');
var StokageLocation = mongoose.model('StokageLocation');

module.exports = function (app) {

  //This is for get all location in the DB
  app.get('/locations', function (req, res, next) {
    StokageLocation.find({}, function (err, locations) {
      if (err) {
        return next(err);
      }
      return res.json(locations);
    });
  });

  //This is for add a location to the DB
  app.post('/locations', function (req, res, next) {
    var locationInst = new StokageLocation();
    locationInst.location = req.body.location;

    locationInst.save(function (err, location) {
      if (err) {
        return next(err);
      }
      return res.json(location);
    });
  });

  //This is for update a location in the DB
  app.put('/locations/:id', function (req, res, next) {
    var id = req.param('id'),
      query = StokageLocation.findById(id);

    query.exec(function (err, stokageLocation) {
      if (err) {
        return next(err);
      }
      if (!stokageLocation) {
        return next(); // 404
      }
      stokageLocation.location = req.body.location;
      stokageLocation.save(function (err,  stokageLocation) {
        if (err) {
          return next(err);
        }
        return res.json(stokageLocation);
      });
    });
  });

  //This is for remove a location in the DB
  app.delete('/locations/:id', function (req, res, next) {
    var id = req.param('id');

    StokageLocation.findById(id, function (err, stokageLocation) {
      if (err) {
        return next(err);
      }
      stokageLocation.remove(function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).end();
      });
    });
  });
};
