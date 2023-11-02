const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    timeslot: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('timeslot', timeslotSchema);