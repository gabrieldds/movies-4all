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
      this.belongsToMany(models.Artist, {
        through: "MovieDirectors",
        foreignKey: "movieId",
        as: "directors",
      });
      this.belongsToMany(models.Artist, {
        through: "MovieActors",
        foreignKey: "movieId",
        as: "actors",
      });
      this.belongsToMany(models.Genre, {
        through: "MovieGenres",
        foreignKey: "movieId",
        as: "genres",
      });
      this.hasMany(models.Vote, {
        foreignKey: "movieId",
        as: "votes",
      });
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      originalTitle: DataTypes.STRING,
      releaseDate: DataTypes.STRING,
      overview: DataTypes.TEXT,
      duration: DataTypes.INTEGER,
      voteCount: DataTypes.DOUBLE,
      voteAverage: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  Movie.beforeCreate((movie) => (movie.id = uuid()));
  return Movie;
};
