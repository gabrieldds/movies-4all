const { query } = require("express");

class MovieService {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async create(data) {
    const { title, overview, originalTitle, releaseDate, duration } = data;

    const movie = await this.movieRepository.create({
      title,
      overview,
      originalTitle,
      releaseDate,
      duration,
    });

    return movie;
  }

  async findById(id) {
    const movies = await this.movieRepository.findById(id);
    return movies;
  }

  async find(params) {
    const query = {};
    console.log(params);
    const { title, actor, genre, director } = params;
    if (title) query["title"] = title;
    if (actor) query["$actors.name$"] = actor;
    if (director) query["$directors.name$"] = director;
    if (genre) query["$genres.name$"] = genre;
    const movies = await this.movieRepository.find(query);
    return movies;
  }
}

module.exports = MovieService;
