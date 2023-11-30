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

timeslotSchema.methods.getTimeList = function() {
    let dayofWeek = Math.round(this.timeslot / 10);
    let isMorning = this.timeslot % 2 === 0;
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + (((dayofWeek + 7 - nextDate.getDay()) % 7) || 7));
    let hours = isMorning ? [8,9,10,11]: [13,14,15,16];

    return hours.map((hour) => {
        let d = new Date(nextDate);
        d.setHours(d.getTimezoneOffset() == 0 ? hour+6 : hour);
        d.setMinutes(0);
        d.setSeconds(0);
        return d;
    })
}

module.exports = mongoose.model('timeslot', timeslotSchema);