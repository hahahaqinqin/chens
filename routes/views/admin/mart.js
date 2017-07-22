const express = require('express');
const router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
	res.render('admin/mart', {
		title: 'Mr Chen\'s Admin Page - Mart',
	});
});

module.exports = router;