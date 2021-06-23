const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

class UserController {
  constructor(userService) {
    this.userService = userService;
    this.login = this.login.bind(this);
    this.createAdmin = this.createAdmin.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteAdmin = this.deleteAdmin.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async login(request, response) {
    try {
      const { email, password } = request.body;
      const user = await this.userService.find({ email });

      if (!user) return response.status(404).json();

      const passwordIsValid = bcrypt.compareSync(
        password,
        user.dataValues.password
      );

      if (!passwordIsValid) {
        return response.status(400).json({
          errors: [{ message: "Password invalid." }],
          auth: false,
          token: null,
        });
      }

      const { id, name, role } = user.dataValues;

      const userToken = {
        id,
        name,
        role,
      };

      const token = jwt.sign(userToken, secret, {
        expiresIn: 3600,
      });

      return response.status(200).json({ id, name, auth: true, token: token });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async createAdmin(request, response) {
    try {
      const { name, email, password } = request.body;
      const admin = await this.userService.createAdmin({
        name,
        email,
        password,
      });
      return response.status(201).json(admin);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async createUser(request, response) {
    try {
      const { name, email, password } = request.body;
      const user = await this.userService.createUser({
        name,
        email,
        password,
      });
      return response.status(201).json(user);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async updateAdmin(request, response) {
    try {
      const { id } = request.params;
      const { name, email } = request.body;
      const admin = await this.userService.updateAdmin({ id, name, email });
      return response.json(admin);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async updateUser(request, response) {
    try {
      const { id } = request.params;
      const { name, email } = request.body;
      const user = await this.userService.updateUser({ id, name, email });
      return response.json(user);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async deleteAdmin(request, response) {
    try {
      const { id } = request.params;
      await this.userService.deleteAdmin({ id });
      return response.status(204).json();
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async deleteUser(request, response) {
    try {
      const { id } = request.params;
      await this.userService.deleteUser({ id });
      return response.status(204).json();
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
