const { Router } = require("express");
const GenreRepository = require("../repositories/genreRepository");
const GenreService = require("../services/genreService");
const GenreController = require("../controllers/genreController");

const genreRepository = new GenreRepository();
const genreService = new GenreService(genreRepository);
const genreController = new GenreController(genreService);

const genreRouter = Router();

genreRouter.post("/", genreController.create);

module.exports = { genreRouter };
