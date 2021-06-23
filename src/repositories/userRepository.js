const { User } = require("../models");
const { Op } = require("sequelize");

class UserRepository {
  async create(data) {
    const user = await User.create(data, { silent: true });
    return user;
  }

  async findById(id) {
    const user = await User.findOne({
      where: {
        id,
        deletedAt: {
          [Op.eq]: null,
        },
      },
    });
    return user;
  }

  async update(id, data) {
    const user = await User.update(data, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    });
    return user[1];
  }

  async find(param = {}) {
    param.deletedAt = null;
    const user = await User.findOne({
      where: param,
    });
    return user;
  }

  async delete(id) {
    const result = await User.update(
      {
        deletedAt: Date.now(),
      },
      {
        where: {
          id,
        },
      }
    );
    console.log(result);
    return result;
  }
}

module.exports = UserRepository;
