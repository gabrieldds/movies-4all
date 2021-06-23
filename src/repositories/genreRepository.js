const { Genre } = require("../models");

class GenreRepository {
  async create(data) {
    const genre = await Genre.create(data, { silent: true });
    return genre;
  }

  async findById(id) {
    const genre = await Genre.findByPk(id);
    return genre;
  }
}

module.exports = GenreRepository;
