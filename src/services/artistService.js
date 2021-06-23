class ArtistService {
  constructor(artistRepository) {
    this.artistRepository = artistRepository;
  }

  async create(data) {
    const { name } = data;

    const artist = await this.artistRepository.create({
      name,
    });

    return artist;
  }
}

module.exports = ArtistService;
