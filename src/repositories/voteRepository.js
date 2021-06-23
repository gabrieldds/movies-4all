const { Vote, Movie } = require("../models");

class VoteRepository {
  async create(data) {
    const { userId, movieId, score } = data;
    const vote = await Vote.create(
      { userId, movieId, score },
      { silent: true }
    );
    const movie = await Movie.findByPk(movieId, {
      include: ["votes"],
    });
    const { votes } = movie;
    const count = votes.reduce((acc, curr) => acc + curr.dataValues.score, 0);
    const average = count / votes.length;
    await Movie.update(
      {
        voteAverage: average,
        voteCount: votes.length,
      },
      {
        where: {
          id: movieId,
        },
      }
    );
    return vote;
  }

  async find(params = {}) {
    const vote = await Vote.findOne({
      where: params,
    });
    return vote;
  }
}

module.exports = VoteRepository;
