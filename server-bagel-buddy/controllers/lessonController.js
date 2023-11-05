const mongoose = require('mongoose');
const Lesson = mongoose.model('lesson');
const User = mongoose.model('user');
const authHandler = require('./authController.js');

const lessonStatus = {
    PENDING: 0,
    CANCELED: 1,
    CONFIRMED: 2,
};

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

exports.confirmLesson = async (req, res) => {
    try {
        let decode = authHandler.authenticateToken(req);
        let userId = decode._id;
        
        // check if teacher exist
        let teacher = await User.findOne({ _id: userId, type: 1 });
        if (!teacher) {
            return res.status(401).json({ message: `Invalid teacher token. Please check if this person exists and is a teacher.` });
        }

        // check if lesson exist
        let lessonId = req.params.id;
        let lesson = await Lesson.findOne({ _id: lessonId });
        if (!lesson) {
            return res.status(401).json({ message: `Lesson with id ${lessonId} does not exist` });
        } else if (lesson.status !== lessonStatus.PENDING) {
            return res.status(401).json({ message: `Lesson with id ${lessonId} is already ${lesson.status === lessonStatus.CANCELED ? 'canceled': 'confirmed'}.` });
        } else if (lesson.teacherId !== userId) {
            return res.status(401).json({ message: `The user is not the teacher of course ${lessonId}` });
        }

        let student = await User.findOne({ _id: lesson.studentId, type: 0 });

        lesson.status = lessonStatus.CONFIRMED; 
        // TODO: create meet link
        console.log("student email:", student.email, "teacher email:", teacher.email);
        lesson.meetLink = "https://meet.google.com/oau-uzau-tss";

        await lesson.save();
        res.json({ "data": lesson });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
}