const express = require('express');
const router  = express.Router();
const Enq     = require('../../../models/enquiries.js');

/* GET contact page. */
router.get('/', function(req, res, next) {
	Enq.find().then(function (enquiries) {
		enquiries: enquiries.map(function (item) {
			return {
				fname   : item.fname,
				lname   : item.lname,
				mail    : item.mail,
				addDate : item.addDate,
				content : item.content
			}
		})
		res.render('admin/enquiries', {
			title: 'Mr Chen\'s Admin Page - Enquiries',
			context: enquiries
		});
	})
});

module.exports = router;