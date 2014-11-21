var mongoose = require('mongoose');
var parts = mongoose.model('partType');

module.exports = function (app) {

	app.get('/partType', function(req, res, next){
		partType.find({}, function(err, partType){
			if (err){
				return next(err);
			}
			return res.json(partType);
		});
	});


	app.post('/partType', function(req, res, next){
		var partTypeInst = new partType();
		partTypeInst._id = null;
		partTypeInst.name = res.body.name;
		partTypeInst.created = null;
		partTypeInst.modified =null;

		partTypeInst.save(function (err, partType) {
      if (err) {
        return next(err);
      }
      return res.json(partType);
	    });
	});


	app.put('/partType:_id', function(req, res, next){
		var id = req.param('id');
		query = partType.findById(id);

		 query.exec(function (err, partType) {
      if (err) {
        return next(err);
      }
      if (!partType) {
        return next(); // 404
      }
      partType.name = req.body.name;
      partType.save(function (err,  partType) {
        if (err) {
          return next(err);
        }
        return res.json(partType);
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

