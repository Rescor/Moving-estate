"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {
    static associate(models) {
      Feature.belongsToMany(models.Property, {
        through: models.PropertyFeature,
        foreignKey: "featureId",
      });
    }

    simpleView() {
      return {
        feature: this.icon,
        title: this.PropertyFeature.title,
      };
    }
  }
  Feature.init(
    {
      icon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Feature",
    }
  );
  return Feature;
};
