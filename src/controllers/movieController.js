class MovieController {
  constructor(movieService) {
    this.movieService = movieService;
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.findById = this.findById.bind(this);
  }

  async create(request, response) {
    try {
      const { title, director, totalCopies, currentCopies, price } =
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
      const { title, director } = request.query;
      const movies = await this.movieService.find({
        title,
        director,
      });
      return response.json(movies);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = MovieController;
