var auth = require('./controllers/auth.js'),
	post = require('./controllers/post.js'),
	upload = require('./controllers/upload.js'),
	//category = require('./controllers/category.js'),
	User = require('./models/user.js'),
	bcrypt = require('bcrypt-nodejs'),
	fs = require('fs'),
	LocalStrategy = require('passport-local').Strategy;

module.exports = {

	initialise: function(app, passport){

		var authenticate = function(req, res, next){
			passport.authenticate('local', function(error, user, message) {
				if (error) {
					return next(error);
				} else if (message){
					res.statusCode = 403;
					return res.send(message);
				}
				next();
			})(req, res, next);
		};

		passport.serializeUser(function(user, done) {
			done(null, user);
		});
		passport.deserializeUser(function(user, done) {
			done(null, user);
		});
		passport.use(new LocalStrategy(
			function(username, password, done){
				User.findOne({ username: username }, function (error, user) {
					if (error) { 
						return done(error); 
					} else if (!user) {
						return done(null, false, {message: 'Incorrect username'});
					} else if(!bcrypt.compareSync(password, user.password)){
						return done(null, false, {message: 'Incorrect password'});
					}
					return done(null, user);
				});
			}
		));

		app
			//Auth api
			.post('/auth/login', passport.authenticate('local', {failureFlash: true}), auth.logged)
			.post('/auth/register', auth.register)
			.get('/auth/logout',	auth.loggedIn, auth.logout)
			.get('/auth/authorise', auth.authorise)

			//Post api
			.get('/posts', post.view)
			.get('/posts/:data', post.get)
			.post('/posts/create', auth.loggedIn, post.create)
			.delete('/posts/delete/:data', auth.loggedIn, post.delete)
			.put('/posts/edit', auth.loggedIn, post.edit)

			.post('/upload/image', auth.loggedIn, upload.image)
			.delete('/upload/delete/:file', auth.loggedIn, upload.deleteFile);

			//Category api
			// .get('/categories', category.view)
			// .get('/categories/:data', category.get)
			// .post('/categories/create', auth.loggedIn, category.create)
			// .delete('/categories/delete/:data', auth.loggedIn, category.delete)
			// .put('/categories/edit', auth.loggedIn, category.edit);
	
	}

}