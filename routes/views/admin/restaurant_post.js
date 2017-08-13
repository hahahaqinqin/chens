const express          = require('express');
const router           = express.Router();
const bodyParser       = require('body-parser');
const Promise          = require('bluebird');
const cloudinary       = require('cloudinary').v2;
const Menu             = require('../../../models/menu.js');

// create application/json parser 
const jsonParser       = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
const urlencodedParser = bodyParser.urlencoded({ extended: false });
/* GET contact page. */
router.get('/', function(req, res, next) {
	res.render('admin/restaurant_post', {
		title: 'Mr Chen\'s Admin Page - Restaurant Add',
		user: req.session.user
	});
});

router.post('/', urlencodedParser, function(req, res) {
	if (req.files.picURL.ws.bytesWritten == 0) {
		// console.log(req.files.picURL.ws.bytesWritten);
		return;
	}
	const item = {
		name        : req.body.name,
		onPublic    : req.body.onPublic,
		description : req.body.description,
		ts          : req.body.ts,
		spicy       : req.body.spicy,
		price       : req.body.price,
		discount    : req.body.discount,
		addDate     : req.body.addDate,
		endDate     : req.body.endDate,
		pos         : parseInt(req.body.pos),
		tags        : req.body.tags
	}
	const data = new Menu(item);

	if (req.files.picURL) {
		// Get temp file path 
		const imageFile = req.files.picURL.path;
		// Upload file to Cloudinary
		cloudinary.uploader.upload(imageFile, {
				tags: 'menus'
			})
			.then(function(picURL) {
				// console.log('** file uploaded to Cloudinary service');
				// console.dir(picURL);
				data.picURL = picURL;
				// Save photo with picURL metadata
				data.save();
				res.redirect('/admin/restaurant/post');
			})
			.finally(function(data) {
				// console.log('** photo saved')
			})
	} else {
		data.save();
		res.redirect('/admin/restaurant/post');
	}
})

router.get('/edit/:id', function(req, res, nextd) {
	Promise.all([Menu.find({_id: req.params.id})]).spread(function(menus) {
		res.render('admin/restaurant_post', {
			title: 'Mr Chen\'s Admin Page - Editing: ' + menus[0].name,
			context: menus
		});
	});
});

router.post('/edit/:id', urlencodedParser, function (req, res) {
	Promise.all([Menu.findById({_id: req.params.id})]).spread(function(doc) {
		doc.name        = req.body.name;
		doc.onPublic    = req.body.onPublic;
		doc.description = req.body.description;
		doc.tags        = req.body.tags;
		doc.ts          = req.body.ts;
		doc.price       = req.body.price;
		doc.discount    = req.body.discount;
		doc.spicy       = req.body.spicy;
		doc.addDate     = req.body.addDate;
		doc.endDate     = req.body.endDate,
		doc.pos         = parseInt(req.body.pos);

		if (req.files.picURL) {
			// Get temp file path 
			const imageFile = req.files.picURL.path;
			// Upload file to Cloudinary
			cloudinary.uploader.upload(imageFile, {
					tags: 'menus'
				})
				.then(function(picURL) {
					console.log('** file uploaded to Cloudinary service');
					console.dir(picURL);
					doc.picURL = picURL;
					// Save photo with picURL metadata
					doc.save();
				})
				.finally(function(data) {
					console.log('** photo saved')
				})
		} else {
			doc.save();
		}
	});
	res.redirect('/admin/restaurant');
});

module.exports = router;