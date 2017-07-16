const express = require('express');
const router = express.Router();
const Mart = require('../../models/mart');
const Menu = require('../../models/menu');

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.render('index', {
	// 	title: 'Home'
	// });
	Mart.find({available: true}, function(err, marts){
  		if (err) return console.error(err);
		var context = {
			marts: marts.map(function (item) {
				return {
					name: item.name,
					description: item.description,
					price: item.price,
					category: item.category,
					sku: item.sku,
					discount: item.discount,
					addDate: item.addDate,
					EndDate: item.EndDate,
					tags: item.tags
				}
			})
		};
		res.render('index', context);
	});
});

module.exports = router;
