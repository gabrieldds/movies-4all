const { Router } = require("express");
const { isAuthenticated, isAuthorized } = require("../middlewares");
const VoteRepository = require("../repositories/voteRepository");
const VoteService = require("../services/voteService");
const VoteController = require("../controllers/voteController");

const voteRepository = new VoteRepository();
const voteService = new VoteService(voteRepository);
const voteController = new VoteController(voteService);

const voteRouter = Router();

voteRouter.post(
  "/",
  isAuthenticated,
  isAuthorized("ADMIN", "USER"),
  voteController.create
);

module.exports = { voteRouter };
