// server/backend/controllers/indicationsController.js
const { Indication } = require('../models/Indication');

const createIndication = async (req, res) => {
  const { clientName, phoneNumber, email, status, userId } = req.body;

  if (!clientName || !phoneNumber || !email || !status || !userId) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const indication = await Indication.create({
      clientName,
      phoneNumber,
      email,
      status,
      userId,
    });

    res.status(201).json({ message: 'Indicação criada com sucesso', indication });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar indicação', details: error });
  }
};

const updateIndicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'O status é obrigatório' });
  }

  try {
    const indication = await Indication.findByPk(id);
    if (!indication) {
      return res.status(404).json({ error: 'Indicação não encontrada' });
    }

    indication.status = status;
    await indication.save();

    res.status(200).json({ message: 'Status de indicação atualizado com sucesso', indication });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status da indicação', details: error });
  }
};

module.exports = { createIndication, updateIndicationStatus };
