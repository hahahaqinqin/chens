// Router
// Front
const indexView      = require('./views/index');
const restaurantView = require('./views/restaurant');
const martView       = require('./views/mart');
const contactView    = require('./views/contact');
// Back
const adminView      = require('./views/admin');
const loginView      = require('./views/login');
const postMartView   = require('./views/post-mart');
const postMenuView   = require('./views/post-menu');
// Other
const thanksView     = require('./views/thanks');

module.exports = function(app) {
	// Index
	app.use('/', indexView);
	// post newsletter
	app.post('/process', function(req, res) {
		console.log(req.query.form);
		console.log(req.body.email);
		if (req.xhr || req.accepts('json,html') === 'json') {
			// if there were an error, we would send { error: 'error description' }
			res.send({
				success: true
			});
		} else {
			// if there were an error, we would redirect to an error page
			res.redirect(303, 'back');
		}
	});
	// Restaurant
	app.use('/restaurant', restaurantView);

	// Mart
	app.use('/mart', martView);

	// Contact
	app.use('/contact', contactView);

	// Thanks
	app.use('/thanks', thanksView);

	// Create admin routes; these can be defined anywhere
	app.use('/admin', adminView);
}