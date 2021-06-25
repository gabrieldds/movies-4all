const { Router } = require("express");
const TimeRepository = require("../repositories/timeRepository");
const TimeService = require("../services/timeService");
const TimeController = require("../controllers/timeController");

const timeRepository = new TimeRepository();
const timeService = new TimeService(timeRepository);
const timeController = new TimeController(timeService);

const timeRouter = Router();

timeRouter.put("/", timeController.update);

module.exports = { timeRouter };
