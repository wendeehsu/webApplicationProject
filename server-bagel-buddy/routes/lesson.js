const express = require("express");
const router = express.Router();
const lessonHandlers = require("../controllers/lessonController.js");

// create lesson
router.post("/", lessonHandlers.createLesson);

module.exports = router;