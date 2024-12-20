const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/database'); // Conexão com o MySQL
const router = express.Router();

// Rota POST para criar um novo admin ou parceiro (com senha criptografada)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body; // Recebe dados do formulário

  // Verifica se a senha foi informada
  if (!password || !email || !name || !role) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  try {
    // Verificar se já existe um usuário com esse e-mail
    const [existingUser] = await pool.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email já está registrado.' });
    }

    // Criptografar a senha usando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir o novo admin ou parceiro no banco de dados
    if (role === 'admin') {
      await pool.execute(
        'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );
    } else if (role === 'partner') {
      await pool.execute(
        'INSERT INTO partners (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );
    }

    res.status(201).json({ message: 'Usuário criado com sucesso!' });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

module.exports = router;