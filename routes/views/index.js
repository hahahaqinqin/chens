const express = require('express');
const router = express.Router();
const Mart = require('../../models/mart');
const Menu = require('../../models/menu');

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.render('index', {
	// 	title: 'Home'
	// });

	Mart.find(function(err, marts){
		console.log(marts);
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
			// marts: [
			// 	{
			// 		name        : "Product3",
			// 		description : "Ingredients: a x 10, b x 20, c x 30; Spicy, Sweet, Salt, Bitter, ....",
			// 		price       : 9999,
			// 		category    : "Vegetable",
			// 		sku         : "M-1",
			// 		discount    : 3,
			// 		addDate     : "2017-09-10",
			// 		EndDate     : null,
			// 		tags        : [
			// 			"food",
			// 			"meat",
			// 			"fresh"
			// 		]
			// 	},
			// 	{
			// 		name        : "Product2",
			// 		description : "Ingredients: a x 10, b x 20, c x 30; Spicy, Sweet, Salt, Bitter, ....",
			// 		price       : 9999,
			// 		category    : "Soup",
			// 		sku         : "M-3",
			// 		discount    : 3,
			// 		addDate     : "2017-09-10",
			// 		EndDate     : false,
			// 		tags        : [
			// 			"food",
			// 			"meat",
			// 			"fresh",
			// 			"soup"
			// 		]
			// 	},
			// 	{
			// 		name        : "Product1",
			// 		description : "Ingredients: a x 10, b x 20, c x 30; Spicy, Sweet, Salt, Bitter, ....",
			// 		price       : 9999,
			// 		category    : "Meat",
			// 		sku         : "M-2",
			// 		discount    : 3,
			// 		addDate     : "2017-09-10",
			// 		EndDate     : null,
			// 		tags        : [
			// 			"food",
			// 			"meat",
			// 			"fresh"
			// 		]
			// 	}
			// ]
		};
		res.render('index', context);
	});
	// Menu.find(function(err, menus){
 //  		if (err) return console.error(err);
	// 	var rs = {
	// 		menus: menus.map(function (item) {
	// 			return {
	// 				name: item.name,
	// 				description: item.description,
	// 				price: item.price,
	// 				category: item.category,
	// 				sku: item.sku,
	// 				discount: item.discount,
	// 				addDate: item.addDate,
	// 				EndDate: item.EndDate,
	// 				tags: item.tags
	// 			}
	// 		})
	// 	};
	// 	res.render('index', rs);
	// });
});

module.exports = router;
