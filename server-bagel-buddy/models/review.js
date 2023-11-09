const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    teacherId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    lessonId: {
        type: String,
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('review', reviewSchema);