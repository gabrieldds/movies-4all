class MovieActorController {
  constructor(movieActorService) {
    this.movieActorService = movieActorService;
    this.create = this.create.bind(this);
  }

  async create(request, response) {
    try {
      const { artistId, movieId } = request.body;
      const movieActor = await this.movieActorService.create({
        artistId,
        movieId,
      });
      return response.status(201).json(movieActor);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = MovieActorController;
