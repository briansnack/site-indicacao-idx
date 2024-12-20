const express = require('express');
const pool = require('../config/database'); // Conexão com o MySQL
const router = express.Router();

// Rota para obter as indicações de um parceiro específico (usuário)
router.get('/indications/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query(`
      SELECT 
        ind.id, 
        ind.client_name AS client,
        ind.client_phone AS phone,
        ind.client_email AS email,
        ind.services AS services,
        ind.status,
        ind.observations,
        ind.admin_observation AS adminObservation
      FROM indications ind
      WHERE ind.partner_id = ?
    `, [userId]);

    res.json(rows);  // Retorna as indicações do parceiro (usuário)
  } catch (err) {
    console.error('Erro ao buscar indicações:', err);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para criar uma nova indicação
router.post('/indications', async (req, res) => {
  const { client, phone, email, services, observations, status, userId } = req.body;

  console.log("Dados recebidos no backend:", req.body); // Log dos dados recebidos

  try {
    await pool.query(
      'INSERT INTO indications (client_name, client_phone, client_email, services, observations, status, partner_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [client, phone, email, JSON.stringify(services), observations, status, userId]
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
  const { status, adminObservation } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'O status é obrigatório' });
  }

  try {
    await pool.query('UPDATE indications SET status = ?, admin_observation = ? WHERE id = ?', [status, adminObservation, id]);
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