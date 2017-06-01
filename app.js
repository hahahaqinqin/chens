// Libs
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const lessMiddleware = require('less-middleware');

// Router
const indexView = require('./routes/views/index');
const usersView = require('./routes/views/users');
const aboutView = require('./routes/views/about');
const headerRequest = require('./routes/views/header');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'templates/views'));

console.log('url: ' + __dirname);
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Less Compile
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);

// Router Here
app.use('/', indexView);
app.use('/users', usersView);
app.use('/about', aboutView);
app.use('/', headerRequest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
