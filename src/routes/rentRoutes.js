const { Router } = require("express");
const { isAuthenticated, isAuthorized } = require("../middlewares");
const RentRepository = require("../repositories/rentRepository");
const MovieRepository = require('../repositories/movieRepository');
const TimeRepository = require('../repositories/timeRepository');
const RentService = require("../services/rentService");
const RentController = require("../controllers/rentController");

const rentRepository = new RentRepository();
const movieRepository = new MovieRepository();
const timeRepository = new TimeRepository();
const rentService = new RentService(rentRepository, timeRepository, movieRepository);
const rentController = new RentController(rentService);

const rentRouter = Router();

rentRouter.post(
  "/",
  isAuthenticated,
  isAuthorized("ADMIN", "USER"),
  rentController.create
);

rentRouter.put(
  "/:userId/:movieId",
  isAuthenticated,
  isAuthorized("ADMIN", "USER"),
  rentController.devolve
);

module.exports = { rentRouter };
