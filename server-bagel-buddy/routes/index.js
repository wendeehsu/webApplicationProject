const express = require('express');
const apiRouter = express.Router();
require("../models/user");
require("../models/skill");
require("../models/timeslot");
require("../models/lesson");
require("../models/cancel");
require("../models/review");

apiRouter.use('/user', require('./user'));
apiRouter.use('/lesson', require('./lesson'));

module.exports = apiRouter;