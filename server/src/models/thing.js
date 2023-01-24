'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Thing extends Model {}

  Thing.init({
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    size: DataTypes.INTEGER,
  }, { sequelize, modelName: 'Thing' });

  return Thing;
};