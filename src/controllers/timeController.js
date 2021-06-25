class TimeController {
  constructor(timeService) {
    this.timeService = timeService;
    this.update = this.update.bind(this);
  }

  async update(request, response) {
    try {
      const { devolutionTime, fineTime } = request.body;
      const time = await this.timeService.update({ devolutionTime, fineTime });
      return response.status(200).json(time);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = TimeController;