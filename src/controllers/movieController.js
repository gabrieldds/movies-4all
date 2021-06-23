class MovieController {
  constructor(movieService) {
    this.movieService = movieService;
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.findById = this.findById.bind(this);
  }

  async create(request, response) {
    try {
      const { title, overview, originalTitle, releaseDate, duration } =
        request.body;
      const movie = await this.movieService.create({
        title,
        overview,
        originalTitle,
        releaseDate,
        duration,
      });
      return response.status(201).json(movie);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;
      const movies = await this.movieService.findById(id);
      return response.json(movies);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async find(request, response) {
    try {
      const { title, actor, genre, director } = request.query;
      const movies = await this.movieService.find({
        title,
        actor,
        genre,
        director,
      });
      return response.json(movies);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = MovieController;
