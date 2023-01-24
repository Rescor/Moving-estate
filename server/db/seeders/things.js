'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const createdAt = new Date();
    const updatedAt = new Date();

    await queryInterface.bulkInsert('Things', [
      { name: 'Ball', color: 'red', size: 1, createdAt, updatedAt },
      { name: 'Box', color: 'gray', createdAt, updatedAt },
      { name: 'Toy Train', size: 3, createdAt, updatedAt }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Things', null);
  }
};
