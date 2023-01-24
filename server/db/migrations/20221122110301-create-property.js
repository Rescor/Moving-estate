'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      area: {
        type: Sequelize.INTEGER
      },
      bedrooms: {
        type: Sequelize.INTEGER
      },
      bathrooms: {
        type: Sequelize.INTEGER
      },
      agentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Agents",
          key: "id",
          as: "agentId"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });

    await queryInterface.createTable('PropertyImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false
      },
      propertyId: {
        type: Sequelize.STRING,
        references: {
          model: "Properties",
          key: "id",
          as: "propertyId"
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });

    await queryInterface.createTable('Amenities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });

    await queryInterface.createTable('PropertyAmenities', {
      propertyId: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: "Properties",
          key: "id",
          as: "propertyId"
        },
      },
      amenityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Amenities",
          key: "id",
          as: "amenityId"
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });

    await queryInterface.createTable('Features', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      icon: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });

    await queryInterface.createTable('PropertyFeatures', {
      propertyId: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: "Properties",
          key: "id",
          as: "propertyId"
        },
      },
      featureId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Features",
          key: "id",
          as: "featureId"
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });

    await queryInterface.createTable('FloorPlans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      propertyId: {
        type: Sequelize.STRING,
        references: {
          model: "Properties",
          key: "id",
          as: "propertyId"
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });

    await queryInterface.renameColumn('Messages', 'property_id', 'propertyId');
    await queryInterface.addConstraint('Messages', {
      fields: ['propertyId'],
      type: 'foreign key',
      name: 'propertyId',
      references: {
        table: 'Properties',
        field: 'id'
      }
    });

    const createdAt = new Date();
    const updatedAt = new Date();

    await queryInterface.bulkInsert('Amenities', [
      { title: "Water Cooler", createdAt, updatedAt },
      { title: "Washing Machine", createdAt, updatedAt },
      { title: "Toaster", createdAt, updatedAt },
      { title: "Telephone", createdAt, updatedAt },
      { title: "Stove", createdAt, updatedAt },
      { title: "Sofa Bed", createdAt, updatedAt },
      { title: "Security System", createdAt, updatedAt },
      { title: "Satellite / Cable TV", createdAt, updatedAt },
      { title: "Refrigerator", createdAt, updatedAt },
      { title: "Parking On Street", createdAt, updatedAt },
      { title: "Oven", createdAt, updatedAt },
      { title: "Outdoor Grill", createdAt, updatedAt },
      { title: "Microwave", createdAt, updatedAt },
      { title: "Internet", createdAt, updatedAt },
      { title: "Ice Maker", createdAt, updatedAt },
      { title: "Heating", createdAt, updatedAt },
      { title: "Garage", createdAt, updatedAt },
      { title: "Freezer", createdAt, updatedAt },
      { title: "Air Conditioning", createdAt, updatedAt },
      { title: "Alarm Clock", createdAt, updatedAt },
      { title: "Balcony", createdAt, updatedAt },
      { title: "Clothes Dryer", createdAt, updatedAt },
      { title: "Coffee Maker", createdAt, updatedAt },
      { title: "Deck / Patio", createdAt, updatedAt },
      { title: "Dishes & Utensils", createdAt, updatedAt },
      { title: "Dishwasher", createdAt, updatedAt },
      { title: "Fireplace", createdAt, updatedAt }
    ], {});

    await queryInterface.bulkInsert('Features', [
      { icon: "pool", createdAt, updatedAt },
      { icon: "paw", createdAt, updatedAt },
      { icon: "fence", createdAt, updatedAt },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Properties');
    await queryInterface.dropTable('PropertyImages');
    await queryInterface.dropTable('Amenities');
    await queryInterface.dropTable('PropertyAmenities');
    await queryInterface.dropTable('Features');
    await queryInterface.dropTable('PropertyFeatures');
    await queryInterface.dropTable('FloorPlans');
    await queryInterface.removeConstraint('Messages', 'property_id');
    await queryInterface.renameColumn('Messages', 'propertyId', 'property_id');

    await queryInterface.bulkDelete('Amenities', null);
    await queryInterface.bulkDelete('Features', null);
  }
};