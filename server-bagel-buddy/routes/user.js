const express = require("express");
const router = express.Router();
const userHandlers = require("../controllers/userController.js");

// register a new user
router.post("/auth/register", userHandlers.register);

// sign in
router.post("/auth/login", userHandlers.login);

// find a single user
router.get("/profile", userHandlers.getUser);
router.get("/:id", userHandlers.getUser);

// update user info
router.patch("/profile", userHandlers.updateProfile);

// get user's available timeslot
router.get("/:id/timeslot", userHandlers.getAvailableTimeslots);

// get user's review
router.get("/:id/review", userHandlers.getReviews);

// Get all teachers
router.get("*", userHandlers.getTeacherList);

module.exports = router;