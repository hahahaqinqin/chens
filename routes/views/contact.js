const express = require('express');
const sampleFunc     = require('../../lib/example.js');
const router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
	res.render('contact', {
		title: 'Mr Chen\'s Contact',
		curl: req.originalUrl
	});
});

module.exports = router;