// Libs
const express        = require('express');
const path           = require('path');
const favicon        = require('serve-favicon');
const logger         = require('morgan');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const lessMiddleware = require('less-middleware');
const Mart           = require('./models/mart');
const app            = express();
//temp
const moment         = require('moment');
const now            = moment().format();


// initialize products
Mart.find(function(err, products) {
	if (products.length) return;
	new Mart({
		name: "Product1",
		// slug: "product_1",
		description: "Ingredients: a x 10, b x 20, c x 30; Spicy, Sweet, Salt, Bitter, ....",
		price: 9999,
		category: "Meat",
		sku: "M-2",
		discount: 3,
		addDate: now,
		EndDate: "2017-08-01",
		tags: ["food", "meat", "fresh"]
	}).save();
	new Mart({
		name: "Product2",
		// slug: "product_2",
		description: "Ingredients: a x 10, b x 20, c x 30; Spicy, Sweet, Salt, Bitter, ....",
		price: 9999,
		category: "Soup",
		sku: "M-3",
		discount: 3,
		addDate: now,
		EndDate: "2017-08-01",
		tags: ["food", "meat", "fresh", "soup"]
	}).save();
	new Mart({
		name: "Product3",
		// slug: "product_3",
		description: "Ingredients: a x 10, b x 20, c x 30; Spicy, Sweet, Salt, Bitter, ....",
		price: 9999,
		category: "Vegetable",
		sku: "M-1",
		discount: 3,
		addDate: now,
		EndDate: "2017-08-01",
		tags: ["food", "meat", "fresh"]
	}).save();
});

// connect DB
// const db             = mongoose.connect('momongodb://localhost:27017/chens');

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
