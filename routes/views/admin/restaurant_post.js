const express = require('express');
const router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
	res.render('admin/restaurant_post', {
		title: 'Mr Chen\'s Admin Page - Restaurant Add',
	});
});

module.exports = router;