var mongoose = require('mongoose');

var userSchema  = mongoose.Schema({
	name: String,
	password: String,
	unique: Boolean
});
var User =mongoose.model('Users', userSchema);
module.exports = User;