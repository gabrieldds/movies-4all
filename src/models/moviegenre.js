const { Model } = require("sequelize");
const uuid = require("uuid").v4;

module.exports = (sequelize, DataTypes) => {
  class MovieGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Movie, { foreignKey: "movieId" });
      this.belongsTo(models.Genre, { foreignKey: "genreId" });
    }
  }
  MovieGenre.init(
    {
      movieId: DataTypes.STRING,
      genreId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MovieGenre",
    }
  );
  MovieGenre.beforeCreate((movieGenre) => (movieGenre.id = uuid()));
  return MovieGenre;
};
