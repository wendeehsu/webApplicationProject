const express = require("express");
const router = express.Router();
const lessonHandlers = require("../controllers/lessonController.js");

// create lesson
router.post("/", lessonHandlers.createLesson);

// confirm lesson
router.patch("/:id/confirm", lessonHandlers.confirmLesson);

// cancel lesson
router.patch("/:id/cancel", lessonHandlers.cancelLesson);

// get lesson by type
router.get("/upcoming", lessonHandlers.getUpcomingLesson);
router.get("/pending", lessonHandlers.getPendingLesson);
router.get("/cancel", lessonHandlers.getCancelLesson);
router.get("/history", lessonHandlers.getHistoryLesson);

module.exports = router;