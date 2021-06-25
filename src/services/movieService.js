class MovieService {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async create(data) {
    const { title, director, totalCopies, currentCopies, price } = data;

    const movie = await this.movieRepository.create({
      title,
      director,
      totalCopies,
      currentCopies,
      price,
    });

    return movie;
  }

  async findById(id) {
    const movies = await this.movieRepository.findById(id);
    return movies;
  }

  async find(params) {
    const query = {};
    const { title, director } = params;
    if (title) query["title"] = title;
    if (director) query["$directors.name$"] = director;
    const movies = await this.movieRepository.find(query);
    return movies;
  }
}

module.exports = MovieService;
