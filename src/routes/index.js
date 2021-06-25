const { Router } = require("express");
const { movieRouter } = require("./movieRoutes");
const { userRouter } = require("./userRoutes");
const { adminRouter } = require("./adminRoutes");
const { timeRouter } = require("./timeRoutes");
const { rentRouter } = require("./rentRoutes");
const { authRouter } = require("./authRoutes");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/admins", adminRouter);
router.use("/times", timeRouter);
router.use("/rents", rentRouter);
router.use("/movies", movieRouter);

module.exports = { router };
