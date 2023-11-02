const express = require('express');
const apiRouter = express.Router();
require("../models/user");
require("../models/skill");
require("../models/timeslot");

apiRouter.use('/user', require('./user'));

module.exports = apiRouter;