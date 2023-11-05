const express = require("express");
const router = express.Router();
const lessonHandlers = require("../controllers/lessonController.js");

// create lesson
router.post("/", lessonHandlers.createLesson);

// confirm lesson
router.patch("/:id/confirm", lessonHandlers.confirmLesson);

module.exports = router;