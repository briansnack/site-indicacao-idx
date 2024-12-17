// server/backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Partner = require('../models/Partner');

// Registro de Partner
const registerPartner = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const partner = await Partner.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'Parceiro registrado com sucesso', partner });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar parceiro', details: error });
  }
};

// Login (Admin ou Partner)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const admin = await Admin.findOne({ where: { email } });
    const partner = await Partner.findOne({ where: { email } });

    const user = admin || partner;
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign(
      { userId: user.id, role: admin ? 'admin' : 'partner' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login', details: error });
  }
};

module.exports = { registerPartner, loginUser };
