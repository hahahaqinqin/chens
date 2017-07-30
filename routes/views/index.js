const express = require('express');
const router = express.Router();
const data = require('../../lib/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.render('index', {
	// 	title: 'Home'
	// });
	
	console.log(data.getMenuList());
	console.log(data.getMartList());
	res.render('index', {
		title: 'Home',
		curl: req.originalUrl,
		contextMart: '',
		contextMenu: ''
	});
});

module.exports = router;


