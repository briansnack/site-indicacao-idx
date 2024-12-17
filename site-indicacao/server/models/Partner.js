const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Partner = sequelize.define('Partner', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { tableName: 'partners' });

module.exports = Partner;