class MovieGenreService {
  constructor(movieGenreRepository, movieRepository, genreRepository) {
    this.movieGenreRepository = movieGenreRepository;
    this.movieRepository = movieRepository;
    this.genreRepository = genreRepository;
  }

  async create(data) {
    const { genreId, movieId } = data;
    console.log(data);
    const movieExists = await this.movieRepository.findById(movieId);
    if (!movieExists) {
      throw new Error("movie doens't exists on database");
    }

    const genreExists = await this.genreRepository.findById(genreId);
    if (!genreExists) {
      throw new Error("genre doens't exists on database");
    }

    const movieGenre = await this.movieGenreRepository.create({
      genreId,
      movieId,
    });

    return movieGenre;
  }
}

module.exports = MovieGenreService;
