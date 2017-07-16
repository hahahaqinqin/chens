// Router
// Front
const indexView      = require('./views/index');
const restaurantView = require('./views/restaurant');
const martView       = require('./views/mart');
const contactView    = require('./views/contact');
// Back
const adminView      = require('./views/admin/home');
const loginView      = require('./views/login');
const postMartView   = require('./views/post-mart');
const postMenuView   = require('./views/post-menu');
// Other
const thanksView     = require('./views/thanks');

module.exports = function(app) {
	// Index
	app.use('/', indexView);
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