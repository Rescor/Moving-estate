'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Agent extends Model {
    static associate(models) {
      Agent.hasMany(models.Property, { foreignKey: "agentId" })
    }
  }

  Agent.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: DataTypes.STRING,
    email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agent',
  });
  return Agent;
};