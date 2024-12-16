import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsAuthenticated, setUserType }) => {
  // Estado para armazenar os valores de username e password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUserType(response.data.userType); // Supondo que o backend retorne o tipo de usuário
      }
    } catch (error) {
      setError('Usuário ou senha inválidos');
      console.error("Erro de autenticação", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;