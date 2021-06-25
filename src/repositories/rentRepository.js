const { Rent } = require("../models");

class RentRepository {
  async create(data) {
    console.log(data);
    const rent = await Rent.create(data);

    return rent;
  }

  async update(id, data) {
    const rent = await Rent.update(data, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    });
    return rent[1];
  }

  async findOne(params = {}) {
    params.deliveredDate = null;
    const rent = await Rent.findOne({
      where: params,
    });
    return rent;
  }
}

module.exports = RentRepository;
