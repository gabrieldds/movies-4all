class RentService {
  constructor(rentRepository, timeRepository, movieRepository) {
    this.rentRepository = rentRepository;
    this.timeRepository = timeRepository;
    this.movieRepository = movieRepository;
  }

  async create(data) {
    const { userId, movieId } = data;

    const rentExists = await this.rentRepository.findOne({ userId, movieId });
    const movie = await this.movieRepository.findById(movieId);

    if (rentExists) {
      throw new Error("user already rent in this film.");
    }

    if (!movie) {
      throw new Error("movie doesn't exists in database.");
    }

    const { currentCopies } = movie;
    if (currentCopies === 0)
      throw new Error("movie does not have copies available");

    await this.movieRepository.update(movieId, {
      currentCopies: currentCopies - 1,
    });

    const { devolutionTime } = await this.timeRepository.findById(1);
    const createdAt = new Date();
    const devolutionDate = new Date(
      createdAt.getTime() + devolutionTime * 1000
    );
    console.log(devolutionDate);

    const rent = await this.rentRepository.create({
      userId,
      movieId,
      createdAt,
      devolutionDate,
    });

    return rent;
  }

  async devolve(data) {
    const { userId, movieId, deliveredDate } = data;
    let devolutionPrice;

    const rentExists = await this.rentRepository.findOne({ userId, movieId });
    const { price } = await this.movieRepository.findById(movieId);
    const { devolutionTime, fineTime } = await this.timeRepository.findById(1);

    if (!rentExists) {
      throw new Error("user not rent in this film.");
    }

    const { id, devolutionDate } = rentExists;
    const diffTime = (deliveredDate - devolutionDate.getTime()) / 1000;
    if (parseInt(diffTime) > devolutionTime) {
      devolutionPrice = price * (1 + parseInt(diffTime / fineTime) * 0.1);
    } else {
      devolutionPrice = price;
    }

    await this.rentRepository.update(id, {
      deliveredDate: new Date(deliveredDate),
      devolutionPrice,
    });
    return devolutionPrice;
  }
}

module.exports = RentService;
