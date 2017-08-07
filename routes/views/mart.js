const express = require('express');
const router = express.Router();

/* GET mart page. */
router.get('/', function(req, res, next) {
	res.render('mart', {
		title: 'Mr Chen\'s - Restaurant',
		curl: req.originalUrl
	});
});


module.exports = router;