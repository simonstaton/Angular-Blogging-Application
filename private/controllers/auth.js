var User = require('../models/user.js'),
	bcrypt = require('bcrypt-nodejs');

module.exports = {

	loggedIn: function(req, res, next){

		if(req.isAuthenticated()){
			return next();
		}

		res.statusCode = 403;
		res.send({error: 'Please log in'});

	},

	authorise: function(req, res){

		if(req.isAuthenticated()){
			res.send(req.session.passport);
		} else {
			res.statusCode = 403;
			res.send({error: 'Please log in'});
		}

	},

	logout: function(req, res) {
		req.logout();
		res.send({});
	},

	logged: function(req, res){
		res.send(req.session.passport);
	},

	register: function(req, res){

		var user = new User({
				username: req.body.username,
				password: bcrypt.hashSync(req.body.password),
				email: req.body.email
			});

		user.save(function(err){
			if (err) {
				res.statusCode = 403;
				res.send(err);
			} else {
				res.send(user);
			}
		});


	}

}