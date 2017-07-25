// Router
// Front
const indexView               = require('./views/index');
const restaurantView          = require('./views/restaurant');
const martView                = require('./views/mart');
const contactView             = require('./views/contact');
const headerView              = require('./views/header');
// Back
const adminHomeView           = require('./views/admin/home');
const adminRestaurantView     = require('./views/admin/restaurant');
const adminRestaurantPostView = require('./views/admin/restaurant_post');
const adminMartView           = require('./views/admin/mart');
const adminMartPostView       = require('./views/admin/mart_post');
const adminEnquiriesView      = require('./views/admin/enquiries');
// const loginView               = require('./views/login');
// Other
const thanksView              = require('./views/thanks');

module.exports = function(app) {
	// Index
	app.use('/', indexView);
	
	// Restaurant
	app.use('/restaurant', restaurantView);

	// Mart
	app.use('/mart', martView);

	// Contact
	app.use('/contact', contactView);
	app.use('/header', headerView);

	// Thanks
	app.use('/thanks', thanksView);

	// Create admin routes; these can be defined anywhere
	app.use('/admin', adminHomeView);

	// Restaurant Management
	app.use('/admin/restaurant', adminRestaurantView);
	app.use('/admin/restaurant/post', adminRestaurantPostView);

	// Mart Management
	app.use('/admin/mart', adminMartView);
	app.use('/admin/mart/post', adminMartPostView);

	// Enquiries Management
	app.use('/admin/enquiries', adminEnquiriesView);

	// Login
	// app.use('/login', loginView);
}