module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Votes", {
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
      score: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Votes");
  },
};
