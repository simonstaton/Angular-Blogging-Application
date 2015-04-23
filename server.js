__rootDir = __dirname;

var express = require('express'),
	connect = require('connect'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	flash = require('connect-flash')
	mongoose = require('mongoose'),
	passport = require('passport'),
	routes = require('./private/server.routes.js'),
	app = express();

app
	.use(express.static(__dirname+'/public'))
	.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(flash())
	.use(bodyParser.json())
	.use(require('prerender-node').set('prerenderToken', 'eT3ZhxWBIYYKrSVAsvFQ'))
	.use(cookieParser())
	.use(session({secret: 'simons'}))
	.use(passport.initialize())
	.use(passport.session());

routes.initialise(app, passport);

//Handle hash bang directing
app.get('*', function(req, res){
	if (req.accepts('html')) {
		res.sendfile('public/index.html', {root: __dirname });
		return;
	}
});

mongoose.connect('mongodb://localhost:27017/blog');

app.listen(1111);