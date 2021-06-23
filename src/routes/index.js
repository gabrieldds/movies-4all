const { Router } = require("express");
const { movieRouter } = require("./movieRoutes");
const { userRouter } = require("./userRoutes");
const { adminRouter } = require("./adminRoutes");
const { artistRouter } = require("./artistRoutes");
const { genreRouter } = require("./genreRoutes");
const { voteRouter } = require("./voteRoutes");
const { movieGenreRouter } = require("./movieGenreRoutes");
const { movieDirectorRouter } = require("./movieDirectorRoutes");
const { movieActorRouter } = require("./movieActorRoutes");
const { authRouter } = require("./authRoutes");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/admins", adminRouter);
router.use("/artists", artistRouter);
router.use("/genres", genreRouter);
router.use("/votes", voteRouter);
router.use("/movies", movieRouter);
router.use("/movies/genres", movieGenreRouter);
router.use("/movies/actors", movieActorRouter);
router.use("/movies/directors", movieDirectorRouter);

module.exports = { router };
