// Libs
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const lessMiddleware = require('less-middleware');
const session = require('express-session');
const mongoose = require('mongoose');
const config = require('config-lite')(__dirname);
const Menu = require('./models/menu.js');

const app = express();

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

/**
 * Database Configuration
 */
const options = {
	server: {
		socketOptions: {
			keepAlive: 1
		}
	}
};
switch (app.get('env')) {
	case 'development':
		mongoose.connect(config.mongodb.development.connectionString, options);
		mongoose.connection.once('open', function() {
			console.log("we're connected!");
		});
		break;
	case 'production':
		mongoose.connect(config.mongodb.production.connectionString, options);
		mongoose.connection.once('open', function() {
			console.log("we're connected!");
		});
		break;
	default:
		throw new Error('Unknown execution environment: ' + app.get('env'));
}

// Test Data
Menu.find(function (err, menus) {
	if(menus.length) return;
	console.log("Test Data: \n");
	new Menu({
		name: "testtest",
		onPublic: true,
		description: "Hahahaha",
		price: 9.99,
		discount: 0.3,
		addDate: "2017-07-25",
		endDate: "2017-07-25",
		tags: ["a","b","c"],
	}).save();
})
// Add routes
require('./routes/index.js')(app);

// view engine setup
app.set('views', path.join(__dirname, 'templates/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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