'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Property, { as: "property", foreignKey: "propertyId" })
    }
  }

  Message.init({
    client_name: DataTypes.STRING,
    client_email: DataTypes.STRING,
    message: DataTypes.TEXT,
    propertyId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};