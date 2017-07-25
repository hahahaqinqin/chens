const express = require('express');
const router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
	res.render('admin/mart_post', {
		title: 'Mr Chen\'s Admin Page - Mart Add',
	});
});

module.exports = router;