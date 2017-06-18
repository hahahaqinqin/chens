// Libs
const express        = require('express');
const path           = require('path');
const favicon        = require('serve-favicon');
const logger         = require('morgan');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const lessMiddleware = require('less-middleware');
const session        = require('express-session');
const MongoStore     = require('connect-mongo')(session);
const mongoose       = require('mongoose');

const app            = express();

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

// session 中间件
app.use(session({
	name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
	secret: config.session.cookieSecret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	resave: true, // 强制更新 session
	saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
	cookie: {
		maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
	}
	// ,
	// store: new MongoStore({// 将 session 存储到 mongodb
	//   url: config.mongodb// mongodb 地址
	// })
}));

// database configuration
const options = {
	server: {
		socketOptions: {
			keepAlive: 1
		}
	}
};
switch (app.get('env')) {
	case 'development':
		mongoose.connect(config.mongo.development.connectionString, options);
		break;
	case 'production':
		mongoose.connect(config.mongo.production.connectionString, options);
		break;
	default:
		throw new Error('Unknown execution environment: ' + app.get('env'));
}

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
