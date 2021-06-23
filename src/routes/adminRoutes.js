const { Router } = require("express");
const { isAuthenticated, isAuthorized } = require("../middlewares");
const UserRepository = require("../repositories/userRepository");
const UserService = require("../services/userService");
const UserController = require("../controllers/userController");

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const adminRouter = Router();

adminRouter.post(
  "/",
  isAuthenticated,
  isAuthorized("ADMIN"),
  userController.createAdmin
);
adminRouter.put(
  "/:id",
  isAuthenticated,
  isAuthorized("ADMIN"),
  userController.updateAdmin
);
adminRouter.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("ADMIN"),
  userController.deleteAdmin
);

module.exports = { adminRouter };
