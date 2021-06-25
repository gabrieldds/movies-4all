class RentController {
  constructor(rentService) {
    this.rentService = rentService;
    this.create = this.create.bind(this);
    this.devolve = this.devolve.bind(this);
  }

  async create(request, response) {
    try {
      const { userId, movieId } = request.body;
      const rent = await this.rentService.create({
        userId,
        movieId,
      });
      return response.status(201).json(rent);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: error.message });
    }
  }

  async devolve(request, response) {
    try {
      const { userId, movieId } = request.params;
      const { deliveredDate } = request.body;
      const price = await this.rentService.devolve({
        userId,
        movieId,
        deliveredDate,
      });
      return response.status(200).json({ price });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = RentController;
