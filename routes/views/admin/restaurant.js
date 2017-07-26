const express = require('express');
const router = express.Router();
const Menu = require('../../../models/menu.js');

/* GET contact page. */
router.get('/', function(req, res, next) {
	Menu.find({available: true}, function(err, menus) {
		console.log(menus);
  		if (err) return console.error(err);
		const context = {
			menus: menus.map(function(menu) {
				return {
					name: menu.name,
					onPublic: menu.onPublic,
					description: menu.description,
					price: menu.price,
					discount: menu.discount,
					addDate: menu.addDate,
					endDate: menu.endDate,
					tags: menu.tags
				};
			})
		};
		res.render('admin/restaurant', {
			title: 'Mr Chen\'s Admin Page - Restaurant List',
			context: context
		});
	});
});

module.exports = router;