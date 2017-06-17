var mongoose = require('mongoose');

var userSchema  = new Schema({
	name: String,
	password: String,
	unique: true
});
var User =mongoose.model('Users', userSchema);
module.exports = User;