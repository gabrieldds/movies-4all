class MovieActorService {
  constructor(movieActorRepository, movieRepository, artistRepository) {
    this.movieActorRepository = movieActorRepository;
    this.movieRepository = movieRepository;
    this.artistRepository = artistRepository;
  }

  async create(data) {
    const { artistId, movieId } = data;

    const movieExists = await this.movieRepository.findById(movieId);
    if (!movieExists) {
      throw new Error("movie doens't exists on database");
    }

    const actorExists = await this.artistRepository.findById(artistId);
    if (!actorExists) {
      throw new Error("actor doens't exists on database");
    }

    const movieActor = await this.movieActorRepository.create({
      artistId,
      movieId,
    });

    return movieActor;
  }
}

module.exports = MovieActorService;
