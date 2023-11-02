const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('user');
const Skill = mongoose.model('skill');

/* Ref:
 * https://www.loginradius.com/blog/engineering/nodejs-and-mongodb-application-authentication-by-jwt
*/

exports.register = async (req, res) => {
    let session = await mongoose.startSession();
    session.startTransaction();

    try {
        let newUser = new User(req.body);
        let skillList = req.body.skills;
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
        await newUser.save();
        newUser.hash_password = undefined;
        let newSkillList = undefined;
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
        res.json({ "data": { ...newUser.toObject(), skills: newSkillList } });
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

exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
};