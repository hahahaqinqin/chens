const express = require('express');
const Mart = require('../models/mart');
const Menu = require('../models/menu');

exports.getMenuList = function() {
	Menu.find().then(function (menus) {
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
	})
};

exports.getMartList = function() {
	Mart.find().then(function (marts) {
		marts: marts.map(function(mart) {
			return {
				name: mart.name,
				description: mart.description,
				price: mart.price,
				discount: mart.discount,
				addDate: mart.addDate,
				endDate: mart.endDate
			};
		})
	})
};