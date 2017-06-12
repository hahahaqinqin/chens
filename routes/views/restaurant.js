var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('restaurant', {
		title: 'Mr Chen\'s Restaurant',
		curl: req.originalUrl
	});
});


module.exports = router;