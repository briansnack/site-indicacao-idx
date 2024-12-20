require('dotenv').config({ path: __dirname + '/.env' }); // Carrega variáveis de ambiente
const express = require('express');
const cors = require('cors');
const pool = require('./config/database');

const app = express();
const port = process.env.PORT || 5000;

// Configuração de CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // URL do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  })
);

// Middleware para JSON
app.use(express.json());

// Rotas
const authRoutes = require('./routes/authRoutes');
const indicationsRoutes = require('./routes/indicationsRoutes');

app.use('/api', authRoutes);
app.use('/api', indicationsRoutes);

// Rota de Saúde
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Servidor rodando' });
});

// Inicialização do Servidor
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
