import React, { useState } from 'react';
import { login } from '../services/api';

const Login = ({ setIsAuthenticated, setUserType, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);

      localStorage.setItem('token', response.token);

      setIsAuthenticated(true);
      setUserType(response.user.role);
      setToken(response.token);

      alert('Login realizado com sucesso!');
    } catch (error) {
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
          <label htmlFor="password">Senha</label>
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