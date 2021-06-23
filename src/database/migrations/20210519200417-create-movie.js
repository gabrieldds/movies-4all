module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING,
      },
      overview: {
        type: Sequelize.TEXT,
      },
      originalTitle: {
        type: Sequelize.STRING,
      },
      releaseDate: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      voteCount: {
        type: Sequelize.INTEGER,
      },
      voteAverage: {
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
    await queryInterface.dropTable("Movies");
  },
};
