const express = require('express');
const sampleFunc     = require('../../lib/example.js');
const router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
	res.render('about', {
		title: 'Express',
		result: sampleFunc.sampleFunc(999)
	});
});

module.exports = router;