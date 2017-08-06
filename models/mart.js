const mongoose = require('mongoose');

const martSchema = mongoose.Schema({
    sku: String,
    name: String,
    onPublic: Boolean,
    ts: Boolean,
    picURL: String,
    description: String,
    price: parseFloat(Number),
    discount: parseFloat(Number),
    addDate: Date,
    endDate: Date,
    tags: [String],
    pv: Number
});
const Mart = mongoose.model('Mart', martSchema);
module.exports = Mart;
