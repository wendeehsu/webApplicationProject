const mongoose = require('mongoose');

const cancelSchema = new mongoose.Schema({
    lessonId: {
        type: String,
        required: true
    },
    cancelerId: {
        type: String,
        required: true
    },
    note: {
        type: String,
    },
});

module.exports = mongoose.model('cancel', cancelSchema);