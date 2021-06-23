const { Router } = require("express");
const { isAuthenticated, isAuthorized } = require("../middlewares");
const MovieGenreRepository = require("../repositories/movieGenreRepository");
const MovieRepository = require("../repositories/movieRepository");
const GenreRepository = require("../repositories/genreRepository");
const MovieGenreService = require("../services/movieGenreService");
const MovieGenreController = require("../controllers/movieGenreController");

const movieGenreRepository = new MovieGenreRepository();
const movieRepository = new MovieRepository();
const genreRepository = new GenreRepository();
const movieGenreService = new MovieGenreService(
  movieGenreRepository,
  movieRepository,
  genreRepository
);
const movieGenreController = new MovieGenreController(movieGenreService);

const movieGenreRouter = Router();

movieGenreRouter.post(
  "/",
  isAuthenticated,
  isAuthorized("ADMIN"),
  movieGenreController.create
);

module.exports = { movieGenreRouter };
