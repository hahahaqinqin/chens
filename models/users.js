const mongoose = require('mongoose');

const userSchema  = mongoose.Schema({
	name: String,
	password: String,
	unique: Boolean
});
const User =mongoose.model('Users', userSchema);
module.exports = User;