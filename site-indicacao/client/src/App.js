import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import './styles/App.css';

function App() {
  // Definindo o estado do tema (escuro ou claro) com base na configuração salva no localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;  // Define o tema como escuro por padrão, caso não exista preferência salva
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');
  const [newIndications, setNewIndications] = useState([]);

  useEffect(() => {
    // Adiciona a classe correspondente ao tema no body
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleNewIndication = (newIndication) => {
    setNewIndications((prevIndications) => [...prevIndications, newIndication]);
  };

  // Função que alterna entre os temas claro e escuro e salva essa preferência no localStorage
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;  // Alterna entre os estados do tema
    setDarkMode(newDarkMode);  // Atualiza o estado do tema
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');  // Salva a preferência no localStorage
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {isAuthenticated ? (
        userType === 'admin' ? (
          <AdminDashboard newIndications={newIndications} />
        ) : (
          <UserDashboard onNewIndication={handleNewIndication} />
        )
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />
      )}

      <footer className="footer">
        © 2024 IDX Company. Todos os direitos reservados.
      </footer>

      <button className="toggle-theme" onClick={toggleDarkMode}>
        <img
          src={
            darkMode
              ? 'https://cdn-icons-png.flaticon.com/512/414/414891.png' // Ícone para tema escuro
              : 'https://cdn-icons-png.flaticon.com/128/5311/5311069.png' // Ícone para tema claro
          }
          alt="Alternar Tema" // Texto alternativo para o ícone
        />
      </button>
    </div>
  );
}

export default App;