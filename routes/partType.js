var mongoose = require('mongoose');
var parts = mongoose.model('stockagePartType');

module.exports = function (app) {

	app.get('/partType', function(req, res, next){
		stockagePartType.find({}, function(err, partType){
			if (err){
				return next(err);
			}
			return res.json(partType);
		});
	});


	app.post('/partType', function(req, res, next){
		var partTypeInst = new stockagePartType();
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
		query = stockagePartType.findById(id);

		 query.exec(function (err, stockagePartType) {
      if (err) {
        return next(err);
      }
      if (!stockagePartType) {
        return next(); // 404
      }
      stockagePartType.name = req.body.name;
      stockagePartType.save(function (err,  stockagePartType) {
        if (err) {
          return next(err);
        }
        return res.json(stockagePartType);
      });
    });
  });


	app.delete('/partType/:id', function (req, res, next) {
    var id = req.param('id');

    stockagePartType.findById(id, function (err, stockagePartType) {
      if (err) {
        return next(err);
      }
      stockagePartType.remove(function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).end();
      });
    });
  });
};

