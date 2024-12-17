const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/database');
const router = express.Router();

// Rota de Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o email existe no banco
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Email não encontrado.' });
    }

    const user = rows[0];

    // Verificar se o usuário ainda não tem senha cadastrada
    if (!user.password) {
      // Criptografar a senha fornecida
      const hashedPassword = await bcrypt.hash(password, 100);

      // Atualizar o banco com a senha criptografada
      await pool.execute(
        'UPDATE users SET password = ? WHERE email = ?',
        [hashedPassword, email]
      );

      return res.json({ message: 'Senha criada com sucesso! Login bem-sucedido.', user: { email: user.email } });
    }

    // Verificar se a senha fornecida corresponde à senha armazenada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // Login bem-sucedido
    res.json({ message: 'Login bem-sucedido!', user: { email: user.email } });
  } catch (error) {
    console.error('Erro ao processar o login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

module.exports = router;