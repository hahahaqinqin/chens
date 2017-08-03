const express  = require('express');
const router   = express.Router();
// const mongoose = require('mongoose');
const Promise  = require('bluebird');
const Menu     = require('../../models/menu.js');
const Mart     = require('../../models/mart.js');

/* GET home page. */
router.get('/', function(req, res, next) {

	Promise.all([Mart.find(), Menu.find()]).spread(function (marts, menus) {
		res.render('index', {
			title: 'Home',
			curl: req.originalUrl,
			contextMart: marts,
			contextMenu: menus
		});
	});
});

module.exports = router;