class VoteController {
  constructor(voteService) {
    this.voteService = voteService;
    this.create = this.create.bind(this);
  }

  async create(request, response) {
    try {
      const { userId, movieId, score } = request.body;
      const vote = await this.voteService.create({
        userId,
        movieId,
        score,
      });
      return response.status(201).json(vote);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = VoteController;
