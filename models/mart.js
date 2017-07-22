var mongoose = require('mongoose');

var martSchema = mongoose.Schema({
    sku: String,
    name: String,
    description: String,
    price: Number,
    category: String,
    discount: parseFloat(Number),
    addDate: Date,
    EndDate: Date,
    tags: [String]
});
var Mart = mongoose.model('Mart', martSchema);
module.exports = Mart;
