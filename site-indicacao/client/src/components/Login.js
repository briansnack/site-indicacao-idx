import React, { useState } from 'react';
import { login } from './api';  // Importe a função de login do arquivo api.js

const Login = ({ setIsAuthenticated, setUserType, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Chama a função de login da API
      const response = await login(email, password);

      // Salva o token JWT e o tipo de usuário no armazenamento local
      localStorage.setItem('token', response.token);

      // Configura o estado de autenticação e o tipo de usuário
      setIsAuthenticated(true);
      setUserType(response.userType);
      setToken(response.token);

      // Redirecionar ou dar um feedback ao usuário (opcional)
      alert('Login realizado com sucesso!');
    } catch (error) {
      // Se o login falhar, exibe uma mensagem de erro
      setError('Usuário ou senha inválidos');
      console.error("Erro de login:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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