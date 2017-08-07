const express          = require('express');
const router           = express.Router();
const bodyParser       = require('body-parser');
const Enq              = require('../../models/enquiries.js')

// create application/json parser 
const jsonParser       = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET contact page. */
router.get('/', function(req, res, next) {
	res.render('contact', {
		title: 'Mr Chen\'s Contact',
		curl: req.originalUrl
	});
});

router.post('/',urlencodedParser, function(req, res) {
	const item = {
		mail: req.body.mail,
		addDate: new Date().now,
	}
	const data = new Enq(item);

	data.save();
	res.redirect('/thanks');
})

module.exports = router;