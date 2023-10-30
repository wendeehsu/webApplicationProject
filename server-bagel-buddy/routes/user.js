const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
    try {
        let users = await User.find();
        res.json({ "data": users });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// create a new user
router.post("/", async (req, res) => {
    const user = new User({
        name: req.body.name,
        native_language: req.body.native_language,
        img_url: req.body.img_url,
        points: req.body.points,
        type: req.body.type,
        bio: req.body.bio,
        gmail: req.body.gmail,
    });
    try {
        await user.save();
        res.json({ "data": user });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

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