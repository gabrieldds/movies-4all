const bcryt = require("bcryptjs");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createAdmin(data) {
    const { name, password, email } = data;
    const userExists = await this.userRepository.find({ email });
    if (userExists) {
      throw new Error("user already exists!");
    }
    const hashedPassword = bcryt.hashSync(password);
    const user = await this.userRepository.create({
      name,
      email,
      role: "ADMIN",
      password: hashedPassword,
    });

    return user;
  }

  async createUser(data) {
    const { name, password, email } = data;
    const userExists = await this.userRepository.find({ email });
    if (userExists) {
      throw new Error("user already exists!");
    }
    const hashedPassword = bcryt.hashSync(password);
    const user = await this.userRepository.create({
      name,
      email,
      role: "USER",
      password: hashedPassword,
    });

    return user;
  }

  async find(data) {
    const user = await this.userRepository.find(data);
    return user;
  }

  async updateAdmin(data) {
    const { id, name, email } = data;
    const userExists = await this.userRepository.find({ id });
    if (!userExists) {
      throw new Error("user doesn't exists!");
    }

    const user = await this.userRepository.update(id, {
      name,
      email,
    });

    return user;
  }

  async updateUser(data) {
    const { id, name, email } = data;
    const userExists = await this.userRepository.find({ id });
    if (!userExists) {
      throw new Error("user doesn't exists!");
    }

    const user = await this.userRepository.update(id, {
      name,
      email,
    });

    return user;
  }

  async deleteAdmin(data) {
    const { id } = data;
    const userExists = await this.userRepository.findById(id);
    if (!userExists) {
      throw new Error("user doesn't exists!");
    }

    await this.userRepository.delete(id);
  }

  async deleteUser(data) {
    const { id } = data;
    const userExists = await this.userRepository.findById(id);
    if (!userExists) {
      throw new Error("user doesn't exists!");
    }

    await this.userRepository.delete(id);
  }
}

module.exports = UserService;
