const pool = require('./config/database');

async function checkDatabases() {
  try {
    const result = await pool.query('SELECT datname FROM pg_database');
    console.log('Bancos de dados disponíveis:', result.rows);
  } catch (error) {
    console.error('Erro ao listar os bancos de dados:', error);
  }
}

checkDatabases();