const { Model } = require("sequelize");
const uuid = require("uuid").v4;

module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Movie, { foreignKey: "movieId", as: "movie" });
    }
  }
  Rent.init(
    {
      userId: DataTypes.STRING,
      movieId: DataTypes.STRING,
      devolutionDate: DataTypes.DATE,
      deliveredDate: DataTypes.DATE,
      devolutionPrice: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Rent",
    }
  );
  Rent.beforeCreate((vote) => (vote.id = uuid()));
  return Rent;
};
