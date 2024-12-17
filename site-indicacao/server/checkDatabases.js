const pool = require('./config/database');

async function checkDatabaseConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('Conexão com o banco de dados estabelecida com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

checkDatabaseConnection();