'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PropertyFeature extends Model {

    static associate(models) {
      PropertyFeature.belongsTo(models.Feature, { foreignKey: "featureId" }),
      PropertyFeature.belongsTo(models.Property, { foreignKey: "propertyId" })
    }
  }
  PropertyFeature.init({
    featureId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    propertyId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'PropertyFeature',
  });
  return PropertyFeature;
};