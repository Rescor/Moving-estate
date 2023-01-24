'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PropertyImage extends Model {
    static associate(models) {
      PropertyImage.belongsTo(models.Property, { foreignKey: "propertyId" })
    }
  }
  PropertyImage.init({
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    propertyId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PropertyImage',
  });
  return PropertyImage;
};
