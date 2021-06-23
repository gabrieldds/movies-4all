const { Router } = require("express");
const ArtistRepository = require("../repositories/artistRepository");
const ArtistService = require("../services/artistService");
const ArtistController = require("../controllers/artistController");

const artistRepository = new ArtistRepository();
const artistService = new ArtistService(artistRepository);
const artistController = new ArtistController(artistService);

const artistRouter = Router();

artistRouter.post("/", artistController.create);

module.exports = { artistRouter };
