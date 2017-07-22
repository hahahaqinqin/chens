var mongoose = require('mongoose');

var menuSchema = mongoose.Schema({
   
    name: String,
    description: String,
    price: Number,
    category: String,
    discount: parseFloat(Number),
    addDate: Date,
    EndDate: Date,
    tags: [String]
});
var Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
