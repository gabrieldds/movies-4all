class GenreController {
  constructor(genreService) {
    this.genreService = genreService;
    this.create = this.create.bind(this);
  }

  async create(request, response) {
    try {
      const { name } = request.body;
      const genre = await this.genreService.create({
        name,
      });
      return response.status(201).json(genre);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = GenreController;
