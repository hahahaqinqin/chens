const express = require('express');
const router = express.Router();

/* GET thank page. */
router.get('/', function(req, res, next) {
	res.render('thanks', {
		title: 'Mr Chen\'s Restaurant',
	});
});

module.exports = router;