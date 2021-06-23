const { Model } = require("sequelize");
const uuid = require("uuid").v4;

module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Movie, {
        through: "MovieDirectors",
        foreignKey: "artistId",
      });
      this.belongsToMany(models.Movie, {
        through: "MovieActors",
        foreignKey: "artistId",
      });
    }
  }
  Artist.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Artist",
    }
  );
  Artist.beforeCreate((artist) => (artist.id = uuid()));
  return Artist;
};
