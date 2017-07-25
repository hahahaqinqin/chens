const express = require('express');
const router = express.Router();
const Mart = require('../../../models/menu.js');
const mongoose = require('mongoose');


/* GET contact page. */
router.get('/', function(req, res, next) {
	Mart.find(function(err, marts) {
		if (err) 
			return console.error(err);
		console.log("marts: " + marts);
	})
	Mart.find({available: true}, function(err, marts) {
		console.log(marts);
  		if (err) return console.error(err);
		const context = {
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
		};
		res.render('admin/restaurant', {
			title: 'Mr Chen\'s Admin Page - Restaurant List',
			context: context
		});
	});

});

module.exports = router;