const { MovieDirector } = require("../models");

class MovieDirectorRepository {
  async create(data) {
    const movieDirector = await MovieDirector.create(data, { silent: true });
    return movieDirector;
  }
}

module.exports = MovieDirectorRepository;
