import axios from 'axios';

// Configuração da base URL da API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api', // URL de base
  timeout: 5000, // Timeout para requisições
});

// Função para login
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error("Erro no login:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Função para obter todas as indicações
export const getIndications = async () => {
  try {
    const response = await api.get('/indications');
    return response.data;
  } catch (error) {
    console.error("Erro ao obter indicações:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Função para atualizar o status de uma indicação
export const updateIndicationStatus = async (id, status) => {
  try {
    const response = await api.put(`/indications/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o status da indicação:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Função para cadastrar uma nova indicação
export const createIndication = async (data) => {
  try {
    const response = await api.post('/indications', data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar a indicação:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Função para obter o status de uma indicação específica
export const getIndicationStatus = async (id) => {
  try {
    const response = await api.get(`/indications/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter status da indicação:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export default api;