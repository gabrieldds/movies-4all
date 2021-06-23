const { Router } = require("express");
const UserRepository = require("../repositories/userRepository");
const UserService = require("../services/userService");
const UserController = require("../controllers/userController");

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

module.exports = { userRouter };
