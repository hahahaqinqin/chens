const express          = require('express');
const router           = express.Router();
const bodyParser       = require('body-parser');
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
		price       : req.body.price,
		discount    : req.body.discount,
		addDate     : req.body.addDate,
		endDate     : req.body.endDate,
		tags        : req.body.tags
	}
	const data = new Menu(item);
	data.save();
	res.redirect('/admin/restaurant/post');
})
module.exports = router;