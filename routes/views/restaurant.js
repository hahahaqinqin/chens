const express = require('express');
const router  = express.Router();
const Promise = require('bluebird');
const Menu    = require('../../models/menu.js');

/* GET restaurant page. */
router.get('/', function(req, res, next) {
	Promise.all([
		Menu.find({
			tags: 'l',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 'mt',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 'a',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 'ap',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 's',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 'v',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 'k',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 'c',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 'b',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 's',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 't',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 'p',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 'r',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 'n',
			onPublic: true
		}).sort({pos: 1})
		, Menu.find({
			tags: 'w',
			onPublic: true
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