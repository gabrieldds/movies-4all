module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("MovieDirectors", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      movieId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Movies",
          key: "id",
        },
      },
      artistId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Artists",
          key: "id",
        },
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
    await queryInterface.dropTable("MovieDirectors");
  },
};
