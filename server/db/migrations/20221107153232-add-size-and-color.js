'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Things', 'color', { type: Sequelize.STRING });
    await queryInterface.addColumn('Things', 'size', { type: Sequelize.INTEGER });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Things', 'color');
    await queryInterface.removeColumn('Things', 'size');
  }
};
