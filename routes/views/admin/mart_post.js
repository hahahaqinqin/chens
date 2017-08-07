const express          = require('express');
const router           = express.Router();
const bodyParser       = require('body-parser');
const Promise          = require('bluebird');
const Mart             = require('../../../models/mart.js');

// create application/json parser 
const jsonParser       = bodyParser.json()
 
// create application/x-www-form-urlencoded parser 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET contact page. */
router.get('/', function(req, res, next) {
	res.render('admin/mart_post', {
		title: 'Mr Chen\'s Admin Page - Mart Add',
		user: req.session.user
	});
});

router.post('/', urlencodedParser, function(req, res) {
	const item = {
		sku         : req.body.sku,
		name        : req.body.name,
		onPublic    : req.body.onPublic,
		description : req.body.description,
		ts          : req.body.ts,
		price       : req.body.price,
		discount    : req.body.discount,
		addDate     : req.body.addDate,
		endDate     : req.body.endDate,
		tags        : req.body.tags
	}
	const data = new Mart(item);
	data.save();
	res.redirect('/admin/mart/post');
});

router.get('/edit/:id', function(req, res, nextd) {
	Promise.all([Mart.find({_id: req.params.id})]).spread(function(marts) {
		res.render('admin/mart_post', {
			title: 'Mr Chen\'s Admin Page - Editing: ' + marts[0].name,
			context: marts
		});
	});
});

router.post('/edit/:id', urlencodedParser, function (req, res) {
	Promise.all([Mart.findById({_id: req.params.id})]).spread(function(doc) {
		doc.sku         = req.body.sku;
		doc.name        = req.body.name;
		doc.onPublic    = req.body.onPublic;
		doc.description = req.body.description;
		doc.ts          = req.body.ts;
		doc.price       = req.body.price;
		doc.discount    = req.body.discount;
		doc.addDate     = req.body.addDate;
		if(req.body.endDate !== "" || req.body.endDate !== undefined)
			doc.endDate     = req.body.endDate;
		else
			doc.endDate = "";
		doc.tags        = req.body.tags;
		doc.save();
	});
	res.redirect('/admin/mart');
});

module.exports = router;