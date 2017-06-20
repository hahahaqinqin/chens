var mongoose = require('mongoose');

var martSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    sku: String,
    discount: parseFloat(Number),
    addDate: Date,
    EndDate: Date,
    tags: [String]
});
var Mart = mongoose.model('Mart', martSchema);
module.exports = Mart;
