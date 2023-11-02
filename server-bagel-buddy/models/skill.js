const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    skill: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('skill', skillSchema);