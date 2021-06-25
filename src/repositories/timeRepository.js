const { Time } = require("../models");

class TimeRepository {
  async update(id, data) {
    const time = await Time.update(data, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    });
    return time[1];
  }

  async findById(id) {
    const time = await Time.findByPk(id);
    return time;
  }
}

module.exports = TimeRepository;
