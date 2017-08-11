const mongoose = require('mongoose');

const martSchema = mongoose.Schema({
    sku         : String,
    name        : {type: String, length: 255},
    onPublic    : Boolean,
    ts          : Boolean,
    picURL      : String,
    description : String,
    price       : parseFloat(Number),
    discount    : parseFloat(Number),
    addDate     : Date,
    endDate     : Date,
    tags        : [String],
    pv          : Number
}, {
    collection: 'marts'
});
const Mart = mongoose.model('Mart', martSchema);
module.exports = Mart;
