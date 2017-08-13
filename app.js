// Libs
const express        = require('express');
const path           = require('path');
const favicon        = require('serve-favicon');
const logger         = require('morgan');
const cookieParser   = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const session        = require('express-session');
const mongoose       = require('mongoose');
const Promise        = require('bluebird');
const _config        = require('config-lite')(__dirname);
const bodyParser     = require('body-parser');
// const nodemailer     = require('nodemailer');
const cloudinary     = require('cloudinary').v2;
const Admin          = require('./models/users.js');
const app            = express();

// using Objects Formatting Plugins
app.locals._         = require('underscore');
app.locals._.str     = require('underscore.string');
app.locals.moment    = require('moment');

// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

/**
 * Cloudinary CDN ???
 * env doesn't work
 * Temporary solution down here
 */
// cloudinary.config({
// 	cloud_name: _config.cloudinary.cloud_name,
// 	api_key: _config.cloudinary.api_key,
// 	api_secret: _config.cloudinary.api_secret
// });


// Wire request 'pre' actions
wirePreRequest(app);

// Wire request 'post' actions
wirePostRequest(app);

function wirePreRequest(app){
  app.use(function (req, res, next) {
    console.log(req.method +" "+ req.url);
    res.locals.req = req;
    res.locals.res = res;

    if (typeof(process.env.CLOUDINARY_URL)=='undefined'){
      throw new Error('Missing CLOUDINARY_URL environment variable')
    }else{
      // Expose cloudinary package to view
      res.locals.cloudinary = cloudinary;
      next()
    }
  })
}

function wirePostRequest(app){
  app.use(function(err, req, res, next){
    if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next()
    }
    console.log('error (500) '+err.message);
    console.log(err.stack);
    if (~err.message.indexOf('CLOUDINARY_URL')){
      res.status(500).render('errors/dotenv', { error: err})
    }else{
      res.status(500).render('errors/500', { error: err})
    }
  })
}

if (typeof(process.env.CLOUDINARY_URL) == 'undefined') {
	console.warn('!! cloudinary config is undefined !!');
	console.warn('export CLOUDINARY_URL or set dotenv file')
} else {
	console.log('Cloudinary Config: ');
	console.log(cloudinary.config());
}

/**
 * Middleware session
 */

app.use(session({
	name: _config.session.key,
	secret: _config.session.cookieSecret,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: _config.session.maxAge
	}
}));

/**
 * Database Configuration
 */

mongoose.Promise = global.Promise;
const options = {
	useMongoClient: true,
	socketTimeoutMS: 0,
	keepAlive: true,
	reconnectTries: 30
};

switch (app.get('env')) {
	case 'development':
		mongoose.connect(_config.mongodb.development.connectionString, options);
		break;
	case 'production':
		mongoose.connect(_config.mongodb.production.connectionString, options);
		break;
	default:
		throw new Error('Unknown execution environment: ' + app.get('env'));
}

// Admin Sample
Admin.find(function (err, user) {
	if(user.length) return;
	new Admin({
		name: "mrchens",
		password: "admin123",
		unique: true
	}).save();
});

// // nodemailer
// const mailTransport = nodemailer.createTransport('SMTP', {
// 	service: 'Gmail',
// 	secureConnection: true,
// 	auth: {
// 		user: config.gmail.user,
// 		pass: config.gmail.password
// 	}
// });

// Add routes
require('./routes/index.js')(app);

// view engine setup
app.set('views', path.join(__dirname, 'templates/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());


// Less Compile
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	res.render('404');
	// next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// disable header
app.disable('x-powered-by');

module.exports = app;