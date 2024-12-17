const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuração do banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Ex: 'localhost'
  user: process.env.DB_USER,       // Ex: 'root'
  password: process.env.DB_PASSWORD, // Sua senha
  database: process.env.DB_NAME,   // Nome do banco
  port: process.env.DB_PORT || 3306, // Porta padrão do MySQL
});

module.exports = pool;