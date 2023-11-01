const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('user');

/* Ref:
 * https://www.loginradius.com/blog/engineering/nodejs-and-mongodb-application-authentication-by-jwt
*/

exports.register = async (req, res) => {
    let newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

    try {
        await newUser.save();
        newUser.hash_password = undefined;
        res.json({ "data": newUser });
    } catch (err) {
        res.status(400).json({ "error": err.message });
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