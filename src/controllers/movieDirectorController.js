class MovieDirectorController {
  constructor(movieDirectorService) {
    this.movieDirectorService = movieDirectorService;
    this.create = this.create.bind(this);
  }

  async create(request, response) {
    try {
      const { artistId, movieId } = request.body;
      const movieDirector = await this.movieDirectorService.create({
        artistId,
        movieId,
      });
      return response.status(201).json(movieDirector);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = MovieDirectorController;
