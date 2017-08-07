const mongoose = require('mongoose');

const mailSchema  = mongoose.Schema({
	mail: String,
	addDate: Date
},{collection: 'mails'});

const Mails =mongoose.model('mails', mailSchema);
module.exports = Mails;