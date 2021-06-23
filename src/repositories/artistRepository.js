const { Artist } = require("../models");

class ArtistRepository {
  async create(data) {
    const artist = await Artist.create(data, { silent: true });
    return artist;
  }

  async findById(id) {
    const artist = await Artist.findByPk(id);
    return artist;
  }
}

module.exports = ArtistRepository;
