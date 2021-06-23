class GenreService {
  constructor(genreRepository) {
    this.genreRepository = genreRepository;
  }

  async create(data) {
    const { name } = data;

    const genreExists = await this.genreRepository.find({ name });
    if (genreExists) {
      throw new Error("genre exists!");
    }

    const genre = await this.genreRepository.create({
      name,
    });

    return genre;
  }
}

module.exports = GenreService;
