const express = require('express');
const router  = express.Router();
const Promise = require('bluebird');
const Menu    = require('../../models/menu.js');

/* GET restaurant page. */
router.get('/', function(req, res, next) {
	Promise.all([
		Menu.find({
			tags: 'l'
		}).sort({pos: 1})
		, Menu.find({
			tags: 'mt'
		}).sort({pos: 1})
		, Menu.find({
			tags: 'a'
		}).sort({pos: 1})
		, Menu.find({
			tags: 'ap'
		}).sort({pos: 1})
		, Menu.find({
			tags: 's'
		}).sort({pos: 1})
		, Menu.find({
			tags: 'v'
		}).sort({pos: 1})
		, Menu.find({
			tags: 'k'
		}).sort({pos: 1})
		, Menu.find({
			tags: 'c'
		}).sort({pos: 1})
		, Menu.find({
			tags: 'b'
		}).sort({pos: 1})
		, Menu.find({
			tags: 's'
		}).sort({pos: 1})
		, Menu.find({
			tags: 't'
		}).sort({pos: 1})
		, Menu.find({
			tags: 'p'
		}).sort({pos: 1})
		, Menu.find({
			tags: 'r'
		}).sort({pos: 1})
		, Menu.find({
			tags: 'n'
		}).sort({pos: 1})
		, Menu.find({
			tags: 'w'
		}).sort({pos: 1})
	]).spread(function(mL, mMT, mA, mAp, mS, mV, mK, mC, mB, mS, mT, mP, mR, mN, mW) {
		res.render('restaurant', {
			title     : 'Mr Chen\'s Restaurant',
			curl      : req.originalUrl,
			contextL  : mL,
			contextMT : mMT,
			contextA  : mA,
			contextAp : mAp,
			contextS  : mS,
			contextV  : mV,
			contextK  : mK,
			contextC  : mC,
			contextB  : mB,
			contextS  : mS,
			contextT  : mT,
			contextP  : mP,
			contextR  : mR,
			contextN  : mN,
			contextW  : mW
		});
	});
});


module.exports = router;