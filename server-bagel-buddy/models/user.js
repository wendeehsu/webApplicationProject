const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    native_language: String,
    img_url: String,
    points: Number,
    type: Number,
    bio: String,
    gmail: String,
});

module.exports = mongoose.model('user', userSchema);