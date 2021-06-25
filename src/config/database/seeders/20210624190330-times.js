module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Times', [{
    devolutionTime: 60,
    fineTime: 10,
    createdAt: new Date(),
    updatedAt: new Date()
   }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
