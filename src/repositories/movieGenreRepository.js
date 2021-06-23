const { MovieGenre } = require("../models");

class MovieGenreRepository {
  async create(data) {
    const movieGenre = await MovieGenre.create(data, { silent: true });
    return movieGenre;
  }
}

module.exports = MovieGenreRepository;
