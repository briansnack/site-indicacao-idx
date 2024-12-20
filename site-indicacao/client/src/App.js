import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import './styles/App.css';

function App() {
  const [darkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; 
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');
  const [newIndications, setNewIndications] = useState([]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleNewIndication = (newIndication) => {
    setNewIndications((prevIndications) => [...prevIndications, newIndication]);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {isAuthenticated ? (
        userType === 'admin' ? (
          <AdminDashboard newIndications={newIndications} />
        ) : (
          <>
          <UserDashboard onNewIndication={handleNewIndication} />
          {/* Elementos específicos do usuário */}
          <div className="footer-extras">
            <img
              src="/images/logo_idx.png"
              alt="Logo IDX"
              className="logo"
            />
            <button
              className="services-button">
              <a href="https://digitalid.com.br/" target="_blank"
              rel="noopener noreferrer"
              >
              SAIBA SOBRE OS SERVIÇOS
              </a>
            </button>
          </div>
        </> 
        )
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />
      )}

      {/* Footer sempre visível */}
      <footer className="footer">
        Criado por <a href="https://digitalid.com.br/" target="_blank" rel="noopener noreferrer"> Digital!D</a>
      </footer>
    </div>
  );
}

export default App;