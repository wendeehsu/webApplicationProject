const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('user');
const Skill = mongoose.model('skill');
const Timeslot = mongoose.model('timeslot');
const authHandler = require('./authController.js');

/* Ref:
 * https://www.loginradius.com/blog/engineering/nodejs-and-mongodb-application-authentication-by-jwt
*/

exports.register = async (req, res) => {
    let session = await mongoose.startSession();
    session.startTransaction();

    try {
        let newUser = new User(req.body);
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

        let newSkillList = undefined;
        let skillList = req.body.skills;
        if (skillList && newUser && newUser._id) {
            newSkillList = await Promise.all(skillList.map(async (skill) => {
                let newSkill = new Skill({
                    userId: newUser._id,
                    skill: skill
                });
                await newSkill.save();
                return ({ userId: newSkill.userId, skill: newSkill.skill });
            }));
        }

        let newTimeslotList = undefined;
        let timeslotList = req.body.timeslots;
        if (timeslotList && newUser && newUser._id) {
            newTimeslotList = await Promise.all(timeslotList.map(async (timeslot) => {
                let newTimeslot = new Timeslot({
                    userId: newUser._id,
                    timeslot: timeslot
                });
                await newTimeslot.save();
                return ({ userId: newTimeslot.userId, timeslot: newTimeslot.timeslot });
            }));
        }
        await newUser.save();
        newUser.hash_password = undefined;

        res.json({
            "data": {
                ...newUser.toObject(),
                skills: newSkillList,
                timeslots: newTimeslotList
            },
            "token": jwt.sign({
                email: newUser.email,
                name: newUser.name,
                _id: newUser._id
            },
                'RESTFULAPIs')
        });
        await session.commitTransaction();

    } catch (err) {
        await session.abortTransaction();
        res.status(400).json({ "error": err.message });
    } finally {
        session.endSession();
    }

};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: jwt.sign({ email: user.email, name: user.name, _id: user._id }, 'RESTFULAPIs') });

    } catch (err) {
        console.log(err);
    }
};

exports.getTeacherList = async (req, res) => {
    try {
        let type = req.query.type;
        let users = await User.find({ type: type });
        let data = await Promise.all(users.map(async (user) => {
            user.hash_password = undefined;
            let skills = await Skill.find({ userId: user._id });
            return { ...user.toObject(), skills };
        }));
        res.json({ "data": data });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        let userId = undefined;
        if (req.params.id) {
            userId = req.params.id;
        } else {
            let decode = authHandler.authenticateToken(req);
            userId = decode._id;
        }
        let user = await User.findOne({ _id: userId });
        let skills = undefined;
        let timeslots = undefined;
        if (user && user._id) {
            skills = await Skill.find({ userId: user._id });
            timeslots = await Timeslot.find({ userId: user._id });
            user.hash_password = undefined;
            res.json({ "data": { ...user.toObject(), skills, timeslots } });
        } else {
            res.status(400).json({ "error": "User does not exist with id:" + userId });
        }
    } catch (err) {
        res.status(err.status ?? 500).json({ "error": err.message });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        let decode = authHandler.authenticateToken(req);
        userId = decode._id;
        let user = await User.findOne({ _id: userId });
        if (req.body.bio) {
            user.bio = req.body.bio;
        }

        await user.save();
        user.hash_password = undefined;
        res.json({ "data": user });
    } catch (err) {
        res.status(err.status ?? 500).json({ "error": err.message });
    }
}

exports.getAvailableTimeslots = async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ message: `Invalid user id ${userId}` });
        }

        let timeslots = await Timeslot.find({ userId: user._id });
        let data = timeslots.map((t) => t.getTimeList()).flat()
            .map((t) => t.toLocaleString("en-US", { timezone: "GMT-6" }));
        res.json({ "data": data });
    } catch (err) {
        res.status(err.status ?? 500).json({ "error": err.message });
    }
}