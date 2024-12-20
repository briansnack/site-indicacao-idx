const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const router = express.Router();

// Rota GET para depuração
router.get('/login', (req, res) => {
  res.status(200).json({ message: 'Endpoint funcionando, use POST para autenticar.' });
});

// Rota POST para autenticação
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Dados recebidos:", { email, password });

  try {
    let user = null;
    let role = null;

    const [adminRows] = await pool.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );
    console.log("adminRows:", adminRows);

    if (adminRows.length > 0) {
      user = adminRows[0];
      role = 'admin';
    } else {
      const [partnerRows] = await pool.execute(
        'SELECT * FROM partners WHERE email = ?',
        [email]
      );
      console.log("partnerRows:", partnerRows);

      if (partnerRows.length > 0) {
        user = partnerRows[0];
        role = 'partner';
      }
    }

    if (!user) {
      return res.status(404).json({ message: 'Email não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("isPasswordValid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login bem-sucedido!',
      token,
      user: { email: user.email, role },
    });
  } catch (error) {
    console.error('Erro ao processar o login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.', details: error });
  }
});

module.exports = router;