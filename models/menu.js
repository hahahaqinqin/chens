var mongoose = require('mongoose');

var menuSchema = mongoose.Schema({
    name: String,
    onPublic: Boolean,
    description: String,
    price: Number,
    discount: parseFloat(Number),
    addDate: Date,
    endDate: Date,
    tags: [String],
    pv: Number
});
var Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
