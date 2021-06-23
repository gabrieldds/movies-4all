const { Model } = require("sequelize");
const uuid = require("uuid").v4;

module.exports = (sequelize, DataTypes) => {
  class MovieActor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Movie, { foreignKey: "movieId" });
      this.belongsTo(models.Artist, { foreignKey: "artistId" });
    }
  }
  MovieActor.init(
    {
      movieId: DataTypes.STRING,
      artistId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MovieActor",
    }
  );
  MovieActor.beforeCreate((movieActor) => (movieActor.id = uuid()));
  return MovieActor;
};
