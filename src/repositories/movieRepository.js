const { Movie } = require("../models");

const { Op } = require("sequelize");

class MovieRepository {
  async create(data) {
    const movie = await Movie.create(data);
    return movie;
  }

  async findById(id) {
    const movie = await Movie.findByPk(id, {
      include: ["rents"],
    });
    return movie;
  }

  async find(params = {}) {
    const query = Object.keys(params).map((key) => ({
      [key]: { [Op.iLike]: `%${params[key]}%` },
    }));
    const movie = await Movie.findAll({
      include: ["rents"],
      where: {
        [Op.and]: query,
      },
    });
    return movie;
  }

  async update(id, data) {
    const movie = await Movie.update(data, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    });
    return movie[1];
  }

  async delete(id) {
    await Movie.destroy(id);
  }
}

module.exports = MovieRepository;
