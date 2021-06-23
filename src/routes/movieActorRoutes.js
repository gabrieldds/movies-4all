const { Router } = require("express");
const { isAuthenticated, isAuthorized } = require("../middlewares");
const MovieActorRepository = require("../repositories/movieActorRepository");
const MovieRepository = require("../repositories/movieRepository");
const ArtistRepository = require("../repositories/artistRepository");
const MovieActorService = require("../services/movieActorService");
const MovieActorController = require("../controllers/movieActorController");

const movieActorRepository = new MovieActorRepository();
const movieRepository = new MovieRepository();
const artistRepository = new ArtistRepository();
const movieActorService = new MovieActorService(
  movieActorRepository,
  movieRepository,
  artistRepository
);
const movieActorController = new MovieActorController(movieActorService);

const movieActorRouter = Router();

movieActorRouter.post(
  "/",
  isAuthenticated,
  isAuthorized("ADMIN"),
  movieActorController.create
);

module.exports = { movieActorRouter };
