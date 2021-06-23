const { Movie } = require("../models");

const { Op } = require("sequelize");

class MovieRepository {
  async create(data) {
    const movie = await Movie.create(data, { silent: true });
    return movie;
  }

  async findById(id) {
    const movie = await Movie.findByPk(id, {
      include: ["actors", "genres", "votes"],
    });
    console.log(movie);
    return movie;
  }

  async find(params = {}) {
    const query = Object.keys(params).map((key) => ({
      [key]: { [Op.iLike]: `%${params[key]}%` },
    }));
    console.log(params);
    const movie = await Movie.findAll({
      include: ["actors", "genres", "votes"],
      where: {
        [Op.and]: query,
      },
    });
    return movie;
  }

  async delete(id) {
    await Movie.destroy(id);
  }
}

module.exports = MovieRepository;
