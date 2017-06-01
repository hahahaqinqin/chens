var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
	console.log(req.originalUrl);
	// console.log(res);
	res.render('about', { title: 'Express' });
});

module.exports = router;
