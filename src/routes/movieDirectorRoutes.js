const { Router } = require("express");
const { isAuthenticated, isAuthorized } = require("../middlewares");
const MovieDirectorRepository = require("../repositories/movieDirectorRepository");
const MovieRepository = require("../repositories/movieRepository");
const ArtistRepository = require("../repositories/artistRepository");
const MovieDirectorService = require("../services/movieDirectorService");
const MovieDirectorController = require("../controllers/movieDirectorController");

const movieDirectorRepository = new MovieDirectorRepository();
const movieRepository = new MovieRepository();
const artistRepository = new ArtistRepository();
const movieDirectorService = new MovieDirectorService(
  movieDirectorRepository,
  movieRepository,
  artistRepository
);
const movieDirectorController = new MovieDirectorController(
  movieDirectorService
);

const movieDirectorRouter = Router();

movieDirectorRouter.post(
  "/",
  isAuthenticated,
  isAuthorized("ADMIN"),
  movieDirectorController.create
);

module.exports = { movieDirectorRouter };
