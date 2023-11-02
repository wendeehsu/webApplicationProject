const express = require("express");
const User = require("../models/user");
require("../models/skill");
require("../models/timeslot");
const router = express.Router();
const userHandlers = require("../controllers/userController.js");

// register a new user
router.post("/auth/register", userHandlers.register);

// sign in
router.post("/auth/login", userHandlers.login);

// Get all teachers
router.get("*", userHandlers.getTeacherList);

// find a single user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.json({ "data": user });
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            "error": "User with id " + req.params.id + " does not exist."
        });
    }
})

// update user info
router.patch("/:id", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });

		if (req.body.bio) {
			user.bio = req.body.bio;
		}

		await user.save();
        res.json({ "data": user });
	} catch (err) {
        console.log(err.message);
        res.status(404).json({
            "error": "User with id " + req.params.id + " does not exist."
        });
    }
})

module.exports = router;