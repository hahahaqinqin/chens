const express = require('express');
const router = express.Router();
const Mart = require('../../../models/mart.js');

/* GET contact page. */
router.get('/', function(req, res, next) {
	Mart.find().then(function (marts) {
		marts: marts.map(function(mart) {
			return {
				name: mart.name,
				onPublic: mart.onPublic,
				description: mart.description,
				price: mart.price,
				discount: mart.discount,
				addDate: mart.addDate,
				endDate: mart.endDate,
				tags: mart.tags
			};
		})
		res.render('admin/mart', {
			title: 'Mr Chen\'s Admin Page - Mart List',
			context: marts
		});
	})
});

module.exports = router;