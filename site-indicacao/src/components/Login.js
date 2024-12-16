import React, { useState } from 'react';

function Login({ setIsAuthenticated, setUserType }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Realizar a validação e autenticação aqui
    if (email === 'admin@site.com' && password === 'admin123') {
      setUserType('admin');
      setIsAuthenticated(true);
    } else if (email === 'usuario@site.com' && password === 'usuario123') {
      setUserType('usuario');
      setIsAuthenticated(true);
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;