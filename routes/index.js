// Router
// Front
const indexView          = require('./views/index');
const restaurantView     = require('./views/restaurant');
const martView           = require('./views/mart');
const contactView        = require('./views/contact');
// Back
const adminHomeView      = require('./views/admin/home');
const adminMenuView      = require('./views/admin/restaurant');
const adminMartView      = require('./views/admin/mart');
const adminEnquiriesView = require('./views/admin/enquiries');
const loginView          = require('./views/login');
// Other
const thanksView         = require('./views/thanks');

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
	app.use('/admin', adminHomeView);

	// Menu Management
	app.use('/admin/restaurant', adminMenuView);

	// Mart Management
	app.use('/admin/mart', adminMartView);

	// Enquiries Management
	app.use('/admin/enquiries', adminEnquiriesView);

	// Login
	// app.use('/login', loginView);
}