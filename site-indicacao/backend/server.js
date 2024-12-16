const express = require('express');
const { connectDb } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const indicationsRoutes = require('./routes/indicationsRoutes');

const app = express();

app.use(express.json()); // Para analisar o corpo da requisição JSON
app.use('/api', authRoutes);
app.use('/api', indicationsRoutes);

connectDb();

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
