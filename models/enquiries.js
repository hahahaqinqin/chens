var mongoose = require('mongoose');

var enquirySchema  = mongoose.Schema({
	fname: String,
	lname: String,
	mail: String,
	addDate: Date,
	content: String
},{collection: 'enquiries'});
var Enquiries =mongoose.model('Enquiries', enquirySchema);
module.exports = Enquiries;