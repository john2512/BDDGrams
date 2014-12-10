var mongoose = require('mongoose');
var user = mongoose.model('User');

var 

module.exports = function (app) {
	app.get('/signup', function(req, res){
		res.render('signup.jade');
	})

	//create new account
	app.post('/signup', function (req, res, next){
		var email = req.param('email');
		var password = req.param('password');
		if(!(email && password)){
			return invalid();
		}

		user.findById(email, function (err, user){
			if (err) return next(err);

			if (user){
				return res.render('signup.jade', {exists: true});
			}

			crypto.randomBytes(16, function (err, bytes){
				if (err) return next(err);

				var gramsUser = { _id: email};
				gramsUser.salt = bytes.toString('utf8');
				gramsUser.hash = hash(password, user.salt)

				user.create(gramsUser, function (err, newUser){
					if (err) {
						if (err instanceof mongoose.Error.ValidationError) {
							return invalid();
						}
						return next(err);
					}
					//user created successfully
					req.session.isLoggedIn = true;
					req.session.user = email
					console.log('created user: %s', email);
					return res.redirect('/');
				})
			})
		})

		function invalid() {
			return res.render('signup.jade', {invalid: true});
		}
	});
}