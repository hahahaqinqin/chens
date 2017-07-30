var mongoose = require('mongoose');

var enquirySchema  = mongoose.Schema({
	fname: String,
	lname: String,
	mail: String,
	context: String
});
var Enquiries =mongoose.model('Enquiries', enquirySchema);
module.exports = Enquiries;