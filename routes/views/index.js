const express = require('express');
const router = express.Router();
const Mart = require('../../models/mart');
const Menu = require('../../models/menu');

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.render('index', {
	// 	title: 'Home'
	// });
	
	Menu.find().then(function (menus) {
		console.log(menus);
		menus: menus.map(function(menu) {
			return {
				name: menu.name,
				description: menu.description,
				price: menu.price,
				discount: menu.discount,
				addDate: menu.addDate,
				endDate: menu.endDate
			};
		})
		res.render('index', {
			title: 'Home',
			curl: req.originalUrl,
			context: menus
		});
	})
});

module.exports = router;
