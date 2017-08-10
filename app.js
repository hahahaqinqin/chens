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
const config         = require('config-lite')(__dirname);
const bodyParser     = require('body-parser');
const cloudinary     = require('cloudinary');
// const nodemailer     = require('nodemailer');
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
 * Middleware session
 */
app.use(session({
	name: config.session.key,
	secret: config.session.cookieSecret,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: config.session.maxAge
	}
}));

mongoose.Promise = global.Promise;

/**
 * Database Configuration
 */
const options = {
	useMongoClient: true,
	socketTimeoutMS: 0,
	keepAlive: true,
	reconnectTries: 30
};

switch (app.get('env')) {
	case 'development':
		mongoose.connect(config.mongodb.development.connectionString, options);
		break;
	case 'production':
		mongoose.connect(config.mongodb.production.connectionString, options);
		break;
	default:
		throw new Error('Unknown execution environment: ' + app.get('env'));
}

// Cloudinary CDN
cloudinary.config({ 
  cloud_name: config.cloudinary.cloud_name, 
  api_key: config.cloudinary.api_key, 
  api_secret: config.cloudinary.api_secret 
});

// Admin Sample
//Admin.find(function (err, user) {
//	if(user.length) return;
//	new Admin({
//		name: "mrchens",
//		password: "admin123",
//		unique: true
//	}).save();
//});

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

// JSON(middleware)
// app.use(require('body-parser')());
module.exports = app;
