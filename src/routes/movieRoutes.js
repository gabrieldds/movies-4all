const { Router } = require("express");
const { isAuthenticated, isAuthorized } = require("../middlewares");
const MovieRepository = require("../repositories/movieRepository");
const MovieService = require("../services/movieService");
const MovieController = require("../controllers/movieController");

const movieRepository = new MovieRepository();
const movieService = new MovieService(movieRepository);
const movieController = new MovieController(movieService);

const movieRouter = Router();

movieRouter.post(
  "/",
  isAuthenticated,
  isAuthorized("ADMIN"),
  movieController.create
);
movieRouter.get("/", movieController.find);
movieRouter.get("/:id", movieController.findById);

module.exports = { movieRouter };
