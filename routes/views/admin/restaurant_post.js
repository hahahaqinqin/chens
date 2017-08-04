const express          = require('express');
const router           = express.Router();
const bodyParser       = require('body-parser');
const Promise          = require('bluebird');
const Menu             = require('../../../models/menu.js');

// create application/json parser 
const jsonParser       = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET contact page. */
router.get('/', function(req, res, next) {
	res.render('admin/restaurant_post', {
		title: 'Mr Chen\'s Admin Page - Restaurant Add',
		user: req.session.user
	});
});

router.post('/', urlencodedParser, function(req, res) {
	const item = {
		name        : req.body.name,
		onPublic    : req.body.onPublic,
		description : req.body.description,
		ts          : req.body.ts,
		spicy       : req.body.spicy,
		price       : req.body.price,
		discount    : req.body.discount,
		addDate     : req.body.addDate,
		endDate     : req.body.endDate,
		pos         : parseInt(req.body.pos),
		tags        : req.body.tags
	}
	const data = new Menu(item);
	data.save();
	res.redirect('/admin/restaurant/post');
})

router.get('/edit/:id', function(req, res, nextd) {
	Promise.all([Menu.find({_id: req.params.id})]).spread(function(menus) {
		res.render('admin/restaurant_post', {
			title: 'Mr Chen\'s Admin Page - Editing: ' + menus[0].name,
			context: menus[0]
		});
	});
});

router.post('/edit/:id', urlencodedParser, function (req, res) {
	Promise.all([Menu.findById({_id: req.params.id})]).spread(function(doc) {
		doc.name        = req.body.name;
		doc.onPublic    = req.body.onPublic;
		doc.description = req.body.description;
		doc.ts          = req.body.ts;
		doc.spicy       = req.body.spicy;
		doc.price       = req.body.price;
		doc.discount    = req.body.discount;
		doc.addDate     = req.body.addDate;
		doc.endDate     = req.body.endDate;
		doc.pos         = req.body.pos;
		doc.tags        = req.body.tags;
		
		doc.save();
	});
	res.redirect('/admin/restaurant');
});

module.exports = router;