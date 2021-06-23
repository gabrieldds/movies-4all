class ArtistController {
  constructor(artistService) {
    this.artistService = artistService;
    this.create = this.create.bind(this);
  }

  async create(request, response) {
    try {
      const { name } = request.body;
      const artist = await this.artistService.create({
        name,
      });
      return response.status(201).json(artist);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = ArtistController;
