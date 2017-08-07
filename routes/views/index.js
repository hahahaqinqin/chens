const express          = require('express');
const router           = express.Router();
const bodyParser       = require('body-parser');
const Promise          = require('bluebird');
const Menu             = require('../../models/menu.js');
const Mart             = require('../../models/mart.js');
const Mail             = require('../../models/mail.js');

// create application/json parser 
const jsonParser       = bodyParser.json();

// create application/x-www-form-urlencoded parser 
const urlencodedParser = bodyParser.urlencoded({
	extended: false
});

/* GET home page. */
router.get('/', function(req, res, next) {
	Promise.all([Mart.find({
		ts: true
	}).limit(8), Menu.find({
		ts: true
	}).limit(6)]).spread(function(marts, menus) {
		res.render('index', {
			title       : 'Home',
			curl        : req.originalUrl,
			contextMart : marts,
			contextMenu : menus
		});
	});
});

router.post('/', urlencodedParser, function(req, res) {

	Promise.all([Mail.find({mail: req.body.mail})]).spread(function(mails) {
		if (mails.length) {
			res.redirect('/');
		} else {
			const item = {
				mail    : req.body.mail,
				addDate : new Date().getTime(),
			}
			const data = new Mail(item);

			data.save();
			res.redirect('/thanks');
		}
	});
})

module.exports = router;