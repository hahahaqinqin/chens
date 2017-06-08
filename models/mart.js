var mongoose = require('mongoose');

var martSchema = mongoose.Schema({
    name: String,
    description: String,
    price: String,
    discount: Number,
    addDate: Date,
    EndDate: Date,
    tags: [String]
});
var Mart = mongoose.model('Mart', martSchema);
module.exports = Mart;
