const mongoose = require('mongoose');
const moment = require('moment');

const menuSchema = mongoose.Schema({
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
    spicy: Number,
    pos: Number,
    pv: Number
});
const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
