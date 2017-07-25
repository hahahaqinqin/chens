var mongoose = require('mongoose');

var martSchema = mongoose.Schema({
    sku: String,
    name: String,
    onPublic: Boolean,
    description: String,
    price: Number,
    discount: parseFloat(Number),
    addDate: Date,
    endDate: Date,
    tags: [String]
});
var Mart = mongoose.model('Mart', martSchema);
module.exports = Mart;
