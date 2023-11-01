const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    native_language: {
        type: String
    },
    img_url: {
        type: String,
        default: "user1.png"
    },
    points: {
        type: Number,
        default: 0
    },
    type: {
        type: Number
    },
    bio: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    hash_password: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('user', userSchema);