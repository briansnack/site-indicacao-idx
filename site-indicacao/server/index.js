require('dotenv').config({ path: __dirname + '/.env' });  // Carrega variáveis de ambiente
const express = require('express');
const pool = require('./config/database');
const app = express();
const port = 5000;

app.use(express.json());

const cors = require('cors');
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const indicationsRoutes = require('./routes/indicationsRoutes');

app.use('/api', authRoutes);
app.use('/api', indicationsRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Servidor rodando' });
});

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});