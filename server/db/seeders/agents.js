'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const createdAt = new Date();
    const updatedAt = new Date();

    await queryInterface.bulkInsert("Agents", [
      {
        name: "Adam Conover",
        location: "Los Angeles, California",
        email: "jsmastery2022@gmail.com",
        photo: "https://picsum.photos/id/600/300",
        createdAt,
        updatedAt
      },
      {
        name: "John Smith",
        location: "Springfield, Illinois",
        email: "john@example.com",
        photo: "https://picsum.photos/id/698/300",
        createdAt,
        updatedAt
      },
      {
        name: "Anna Johnson",
        location: "New York, New York",
        email: "anna@example.com",
        photo: "https://picsum.photos/id/631/300",
        createdAt,
        updatedAt
      },
      {
        name: "Gregory Brown",
        location: "Tallahassee, Florida",
        email: "gregory@example.com",
        photo: "https://picsum.photos/id/687/300",
        createdAt,
        updatedAt
      },
      {
        name: "Mark Williams",
        location: "Nashville, Tennessee",
        email: "mark@example.com",
        photo: "https://picsum.photos/id/613/300",
        createdAt,
        updatedAt
      },
      {
        name: "Elizabeth Davis",
        location: "Montpelier, Vermont",
        email: "elizabeth@example.com",
        photo: "https://picsum.photos/id/605/300",
        createdAt,
        updatedAt
      },
      {
        name: "Matthew Miller",
        location: "Phoenix, Arizona",
        email: "matthew@example.com",
        photo: "https://picsum.photos/id/670/300",
        createdAt,
        updatedAt
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Agents", null);
  }
};
