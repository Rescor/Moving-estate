'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FloorPlan extends Model {
    static associate(models) {
      FloorPlan.belongsTo(models.Property, { foreignKey: "propertyId" })
    }
  }

  FloorPlan.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    propertyId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'FloorPlan',
  });
  return FloorPlan;
};