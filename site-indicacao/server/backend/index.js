const express = require('express');
const pool = require('./config/database'); // Importa o pool de conexões com o banco
require('dotenv').config();
const app = express();
const port = 5000;

// Middleware para permitir o envio de JSON no corpo das requisições
app.use(express.json());

// Rota para autenticação (substitua com sua implementação real)
const authRoutes = require('./routes/authRoutes');

// Rota para indicações
const indicationsRoutes = require('./routes/indicationsRoutes');

// Usar as rotas de autenticação e indicações
app.use('/api', authRoutes);
app.use('/api', indicationsRoutes);

// Exemplo de rota que utiliza o banco de dados
app.get('/api/indications', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM indications');
    res.json(result.rows); // Retorna as indicações do banco de dados
  } catch (err) {
    console.error('Erro ao buscar indicações:', err.stack);
    res.status(500).send('Erro ao buscar indicações');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
