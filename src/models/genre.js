const { Model } = require("sequelize");
const uuid = require("uuid").v4;

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Movie, {
        through: "MovieGenres",
        foreignKey: "genreId",
      });
    }
  }
  Genre.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Genre",
    }
  );
  Genre.beforeCreate((genre) => (genre.id = uuid()));
  return Genre;
};
