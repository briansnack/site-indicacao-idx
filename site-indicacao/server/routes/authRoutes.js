const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const router = express.Router();

// Rota de Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;
    let role = null;

    // Verificar o email na tabela de admins
    const [adminRows] = await pool.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );

    if (adminRows.length > 0) {
      user = adminRows[0];
      role = 'admin';
    } else {
      // Se não for admin, verificar na tabela de partners
      const [partnerRows] = await pool.execute(
        'SELECT * FROM partners WHERE email = ?',
        [email]
      );

      if (partnerRows.length > 0) {
        user = partnerRows[0];
        role = 'partner';
      }
    }

    // Se o usuário não for encontrado em nenhuma tabela
    if (!user) {
      return res.status(404).json({ message: 'Email não encontrado.' });
    }

    // Comparar a senha fornecida com a senha armazenada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Login bem-sucedido
    res.json({
      message: 'Login bem-sucedido!',
      token,
      user: { email: user.email, role },
    });
  } catch (error) {
    console.error('Erro ao processar o login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

module.exports = router;