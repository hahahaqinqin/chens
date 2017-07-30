const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    name: String,
    onPublic: Boolean,
    picURL: String,
    description: String,
    price: parseFloat(Number),
    discount: parseFloat(Number),
    addDate: Date,
    endDate: Date,
    tags: [String],
    pv: Number
});
const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
