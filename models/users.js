var mongoose = require('mongoose');

var userSchema  = new Schema({
	name: String,
	password: String
});
var User =mongoose.model('Users', userSchema);
module.exports = User;