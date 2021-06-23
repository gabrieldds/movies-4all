class GenreController {
  constructor(genreService) {
    this.genreService = genreService;
    this.create = this.create.bind(this);
  }

  async create(request, response) {
    try {
      const { genreId, movieId } = request.body;
      const genre = await this.genreService.create({
        genreId,
        movieId,
      });
      return response.status(201).json(genre);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = GenreController;
