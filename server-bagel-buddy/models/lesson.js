const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    teacherId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    timeslotStart: {
        type: Date,
        required: true
    },
    timeslotEnd: {
        type: Date,
    },
    meetLink : {
        type: String,
    },
    status: {
        type: Number,
        default: 0
    },
    note : {
        type: String,
        default: "Hi, looking forward to practicing with you!"
    },
    created: {
        type: Date,
        default: Date.now
    }
});

lessonSchema.methods.addHour = function (startTime, value) {
    let endTime = new Date(startTime.getTime());
    endTime.setHours(startTime.getHours() + value);
    return endTime;
};

module.exports = mongoose.model('lesson', lessonSchema);