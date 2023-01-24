'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PropertyAmenity extends Model {

    static associate(models) {
      PropertyAmenity.belongsTo(models.Amenity, { foreignKey: "amenityId" }),
      PropertyAmenity.belongsTo(models.Property, { foreignKey: "propertyId" })
    }
  }

  PropertyAmenity.init({
    propertyId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amenityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PropertyAmenity',
  });
  return PropertyAmenity;
};
