var mongoose = require('mongoose');
var carac = mongoose.model('Carac');

module.exports = function (app) {

	app.get('/carac', function(req, res, next){
		carac.find({}, function(err, partType){
			if (err){
				return next(err);
			}
			return res.json(carac);
		});
	});


	app.post('/carac', function(req, res, next){
		var caraceInst = new carac();
		caracInst._id = null;
		caracInst.name = req.body.name;

		caracInst.save(function (err, carac) {
      if (err) {
        return next(err);
      }
      return res.json(carac);
	    });
	});


	app.put('/carac/:id', function(req, res, next){
		var id = req.param('id');
		query = carac.findById(id);

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


	app.delete('/partType/:id', function (req, res, next) {
    var id = req.param('id');

    partType.findById(id, function (err, partType) {
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