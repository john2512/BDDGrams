var mongoose = require('mongoose');
var carac = mongoose.model('Carac');

module.exports = function (app) {

	app.get('/carac', function (req, res, next){
		carac.find({}, function (err, carac){
			if (err){
				return next(err);
			}
			return res.json(carac);
		});
	});


	app.post('/carac', function (req, res, next){
		var caracInst = new carac();
		caracInst._id = null;
		caracInst.name = req.body.name;

		caracInst.save(function (err, carac) {
      if (err) {
        return next(err);
      }
      return res.json(carac);
	    });
	});


	app.put('/carac/:id', function (req, res, next){
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


	app.delete('/carac/:id', function (req, res, next) {
    var id = req.param('id');

    carac.findById(id, function (err, carac) {
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