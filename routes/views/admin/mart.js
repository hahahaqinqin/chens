const express = require('express');
const router = express.Router();
const Promise  = require('bluebird');
const Mart = require('../../../models/mart.js');

/* GET contact page. */
router.get('/', function(req, res, next) {
	Promise.all([Mart.find()]).spread(function (marts) {
		res.render('admin/mart', {
			title: 'Mr Chen\'s Admin Page - Mart List',
			context: marts
		});
	});
});

module.exports = router;