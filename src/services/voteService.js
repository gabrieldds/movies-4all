class VoteService {
  constructor(voteRepository) {
    this.voteRepository = voteRepository;
  }

  async create(data) {
    const { userId, movieId, score } = data;

    const voteExists = await this.voteRepository.find({ userId, movieId });

    if (voteExists) {
      throw new Error("user already voted in this film.");
    }

    const vote = await this.voteRepository.create({
      userId,
      movieId,
      score,
    });

    return vote;
  }
}

module.exports = VoteService;
