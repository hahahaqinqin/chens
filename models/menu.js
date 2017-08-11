const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    name        : {type: String, length: 255},
    onPublic    : Boolean,
    ts          : Boolean,
    picURL      : {type: JSON},
    description : String,
    price       : parseFloat(Number),
    discount    : parseFloat(Number),
    addDate     : Date,
    endDate     : Date,
    tags        : [String],
    spicy       : Number,
    pos         : Number,
    pv          : Number
}, {
    collection: 'menus'
});
const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
