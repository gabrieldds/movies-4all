const { Model } = require("sequelize");
const uuid = require("uuid").v4;

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Rent, {
        foreignKey: "movieId",
        as: "rents",
      });
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      director: DataTypes.STRING,
      totalCopies: DataTypes.INTEGER,
      currentCopies: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  Movie.beforeCreate((movie) => (movie.id = uuid()));
  return Movie;
};
