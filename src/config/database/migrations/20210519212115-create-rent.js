module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Rents", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.UUID,
      },
      movieId: {
        type: Sequelize.UUID,
        references: {
          model: "Movies",
          key: "id",
        },
      },
      devolutionPrice: {
        type: Sequelize.DOUBLE,
      },
      deliveredDate: {
        type: Sequelize.DATE,
      },
      devolutionDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Votes");
  },
};
