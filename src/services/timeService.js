class TimeService {
    constructor(timeRepository) {
      this.timeRepository = timeRepository;
    }
  
    async update(data) {
      const { devolutionTime, fineTime } = data; 
  
      const time = await this.rentRepository.update(1, { devolutionTime, fineTime });
      return time;
    }
}
  
module.exports = TimeService;
  