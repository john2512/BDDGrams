var mongoose = require('mongoose');
var part = mongoose.model('Part');

module.exports = function (app) {

app.get = ('/part', function(req, res, next){
	part.find({}, function (err, part){
		if (err){
			return next(err);
		}
		return res.json(part);
	});
});

app.post('/part', function (req, res, next){
	var partInst = new part();
	partInst._id = null;
	partInst.name = req.body.name;
	partInst.partType.name = req.body.partType.name;
	partInst.partNumber.name = req.body.partNumber.name;
	partInst.partNumber.value = req.body.partNumber.value;
	partInst.storageLocation.location =  req.body.storageLocation.location;
	partInst.storageLocation.quantity =  req.body.storageLocation.quantity;
	partInst.carac.name =  req.body.carac.name;
	partInst.carac.value =  req.body.carac.value;

	partInst.save(function (err, partType) {
      if (err) {
        return next(err);
      }
      return res.json(part);
	    });
	});

})

app.put('/part/:id', function(req, res, next){
		var id = req.param('id');
		query = part.findById(id);

		 query.exec(function (err, part) {
      if (err) {
        return next(err);
      }
      if (!partType) {
        return next(); // 404
      }
	partInst.name = req.body.name;
	partInst.partType.name = req.body.partType.name;
	partInst.partNumber.name = req.body.partNumber.name;
	partInst.partNumber.value = req.body.partNumber.value;
	partInst.storageLocation.location =  req.body.storageLocation.location;
	partInst.storageLocation.quantity =  req.body.storageLocation.quantity;
	partInst.carac.name =  req.body.carac.name;
	partInst.carac.value =  req.body.carac.value;
      partType.save(function (err,  part) {
        if (err) {
          return next(err);
        }
        return res.json(part);
      });
    });
  });


	app.delete('/part/:id', function (req, res, next) {
    var id = req.param('id');

    part.findById(id, function (err, part) {
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

