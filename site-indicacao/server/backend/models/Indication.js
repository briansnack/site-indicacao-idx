const express = require('express');
const router = express.Router();
const pool = require('../models/database');

// Exemplo de rota para pegar indicações do banco
router.get('/indications', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM indications');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar indicações');
  }
});

module.exports = router;
