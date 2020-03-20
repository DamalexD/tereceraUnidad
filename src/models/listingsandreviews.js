const mongoose = require('mongoose');
const { Schema } = mongoose;

const listingsandreviews = new Schema({
    name: { type: String },
    description: { type: String },
    price: {type:Number},
    property_type: {type: String},
    idCustomer: { type: Number }
});


module.exports = mongoose.model('listingsandreviews', listingsandreviews);