const { Model } = require("sequelize");
const uuid = require("uuid").v4;

module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Movie, { foreignKey: "movieId", as: "movie" });
    }
  }
  Vote.init(
    {
      userId: DataTypes.STRING,
      movieId: DataTypes.STRING,
      score: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  Vote.beforeCreate((vote) => (vote.id = uuid()));
  return Vote;
};
