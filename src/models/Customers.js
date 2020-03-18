const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
const { Schema } = mongoose;

const customers = new Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    district: { type: String, required: true },
    status: { type: String, required: true }
})

customers.plugin(autoIncrement.plugin, {
    model: '_id',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Customers', customers);