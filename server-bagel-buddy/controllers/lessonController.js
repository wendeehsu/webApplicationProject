const mongoose = require('mongoose');
const Lesson = mongoose.model('lesson');
const User = mongoose.model('user');
const authHandler = require('./authController.js');

exports.createLesson = async (req, res) => {
    try {
        let decode = authHandler.authenticateToken(req);
        let studentId = decode._id;

        // check if student exist
        let student = await User.findOne({
            _id: studentId,
            type: 0
        });

        if (!student) {
            return res.status(401).json({ message: `Invalid student id ${req.body.studentId}` });
        }

        let newLesson = new Lesson(req.body);
        newLesson.timeslotEnd = newLesson.addHour(newLesson.timeslotStart, 1);
        newLesson.studentId = studentId;

        // check if teacher exist
        let teacher = await User.findOne({
            _id: req.body.teacherId,
            type: 1
        });

        if (!teacher) {
            return res.status(401).json({ message: `Invalid teacher id ${req.body.teacherId}` });
        }

        // save lesson
        await newLesson.save();
        res.json({ "data": newLesson });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
}