class MovieDirectorService {
  constructor(movieDirectorRepository, movieRepository, artistRepository) {
    this.movieDirectorRepository = movieDirectorRepository;
    this.movieRepository = movieRepository;
    this.artistRepository = artistRepository;
  }

  async create(data) {
    const { artistId, movieId } = data;

    const movieExists = await this.movieRepository.findById(movieId);
    if (!movieExists) {
      throw new Error("movie doens't exists on database");
    }

    const directorExists = await this.artistRepository.findById(artistId);
    if (!directorExists) {
      throw new Error("director doens't exists on database");
    }

    const movieDirector = await this.movieDirectorRepository.create({
      artistId,
      movieId,
    });

    return movieDirector;
  }
}

module.exports = MovieDirectorService;
