const bcrypt = require('bcrypt');
const mysql = require('mysql2');

require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}).promise();

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const updatePassword = async () => {
  const plainTextPassword = '123456';
  const hashedPassword = await hashPassword(plainTextPassword);

  try {
    const [result] = await pool.execute(
      'UPDATE admins SET password = ? WHERE email = ?',
      [hashedPassword, 'admin@site.com']
    );
    console.log('Senha atualizada com sucesso:', result);
  } catch (error) {
    console.error('Erro ao atualizar a senha:', error);
  }
};

updatePassword();