const express = require('express');
const pool = require('../config/database'); // Conexão com o MySQL
const router = express.Router();

// Rota para obter todas as indicações
router.get('/indications', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM indications');
    res.json(rows);  // Retorna as indicações
  } catch (err) {
    console.error('Erro ao buscar indicações:', err);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para criar uma nova indicação
router.post('/indications', async (req, res) => {
  const { client, phone, email, services, observations, status } = req.body;

  try {
    await pool.query(
      'INSERT INTO indications (client, phone, email, services, observations, status) VALUES (?, ?, ?, ?, ?, ?)',
      [client, phone, email, JSON.stringify(services), observations, status]
    );

    res.status(201).json({ message: 'Indicação criada com sucesso' });
  } catch (err) {
    console.error('Erro ao criar indicação:', err);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para atualizar o status de uma indicação
router.put('/indications/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'O status é obrigatório' });
  }

  try {
    await pool.query('UPDATE indications SET status = ? WHERE id = ?', [status, id]);
    res.status(200).json({ message: 'Status de indicação atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar status da indicação:', err);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para deletar uma indicação
router.delete('/indications/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM indications WHERE id = ?', [id]);
    res.status(200).json({ message: 'Indicação deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar indicação:', err);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;