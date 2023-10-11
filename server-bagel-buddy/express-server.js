const express = require('express');
const router = express.Router();

router.get("/api", function (req, res) {
    res.send("I am express api :D");
});

module.exports = router;