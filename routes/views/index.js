const express = require('express');
const router = express.Router();
const data = require('../../lib/index.js');
const Menu = require('../../models/menu.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	const dataMart = [];
	Menu.find().then(function (menus) {
		menus: menus.map(function(menu) {
			menu.discount = parseFloat(menu.price - menu.discount * menu.price / 10).toFixed(2);
			return {
				name: menu.name,
				description: menu.description,
				price: menu.price,
				discount: menu.discount,
				addDate: menu.addDate
			};
		})
		res.render('index', {
			title: 'Home',
			curl: req.originalUrl,
			contextMart: dataMart,
			contextMenu: menus
		});
	})
});

module.exports = router;