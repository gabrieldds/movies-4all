const { MovieActor } = require("../models");

class MovieActorRepository {
  async create(data) {
    const movieActor = await MovieActor.create(data, { silent: true });
    return movieActor;
  }
}

module.exports = MovieActorRepository;
