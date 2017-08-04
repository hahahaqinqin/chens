const express          = require('express');
const router           = express.Router();
const bodyParser       = require('body-parser');
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

module.exports = router;