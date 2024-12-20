import axios from 'axios';

// Configuração da base URL da API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api", // URL de base
  timeout: 5000, // Timeout para requisições
});

// Mock para testar sem o backend
if (process.env.NODE_ENV === 'development') {
  api.post = async (url, data) => {
    if (url === '/indications') {
      // Simulando uma resposta bem-sucedida para criar indicação
      return { data: { message: 'Indicação criada com sucesso' } };
    }
    if (url === '/login') {
      const { email, password } = data;

      // Simulando a verificação do e-mail e senha
      if (email === 'admin@site.com' && password === '123456') {
        // Retorno para o tipo de usuário admin
        return { data: { token: 'mock-token', user: { role: 'admin' } } };
      } else if (email === 'parceiro1@site.com' && password === '123456') {
        // Retorno para o tipo de usuário comum
        return { data: { token: 'mock-token', user: { role: 'user' } } };
      } else {
        throw new Error('Usuário ou senha inválidos');
      }
    }
    throw new Error('Erro ao enviar dados');
  };

  api.get = async (url) => {
    if (url.startsWith('/indications/user/')) {
      // Simulando a resposta de indicações para um usuário específico
      const userId = url.split('/').pop();
      return {
        data: [
          { id: 1, client: 'Cliente 1', status: 'Pendente', services: ['Serviço 1'], observations: 'Observação 1', userId },
          { id: 2, client: 'Cliente 2', status: 'Fechado', services: ['Serviço 2'], observations: 'Observação 2', userId }
        ]
      };
    }
    if (url.startsWith('/indications/')) {
      // Simulando o status de uma indicação específica
      const id = url.split('/').pop();
      return {
        data: { id, status: 'Pendente', client: 'Cliente ' + id, services: ['Serviço mock'], observations: 'Observação mock' }
      };
    }
    throw new Error('Erro ao obter dados');
  };

  api.put = async (url, data) => {
    if (url.startsWith('/indications/')) {
      // Simulando a atualização do status da indicação
      return { data: { message: 'Status atualizado com sucesso' } };
    }
    throw new Error('Erro ao atualizar dados');
  };
}

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

// Função para obter as indicações de um parceiro específico (usuário)
export const getIndications = async (userId) => {
  try {
    const response = await api.get(`/indications/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter indicações:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Função para atualizar o status de uma indicação
export const updateIndicationStatus = async (id, status, adminObservation) => {
  try {
    const response = await api.put(`/indications/${id}`, { status, adminObservation });
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