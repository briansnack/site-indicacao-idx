const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Indication = sequelize.define('Indication', {
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Em análise', // Exemplo de valor default
  },
}, { tableName: 'indications' });

module.exports = Indication;