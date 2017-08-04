const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const Menu = require('../../../models/menu.js');
/* GET contact page. */
router.get('/', function(req, res, next) {
	Promise.all([Menu.find()]).spread(function (menus) {
		res.render('admin/restaurant', {
			title: 'Mr Chen\'s Admin Page - Restaurant List',
			context: menus
		});
	});
});

module.exports = router;