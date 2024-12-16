import React, { useState } from 'react';

const services = [
  "Serviço 1",
  "Serviço 2",
  "Serviço 3",
  "Serviço 4"
];

const UserDashboard = ({ onNewIndication }) => {
  const [selectedService, setSelectedService] = useState('');
  const [indications, setIndications] = useState([]);
  const [newClient, setNewClient] = useState({ name: '', phone: '', email: '' });
  const [viewingStatus, setViewingStatus] = useState(false);

  const handleServiceSelection = (service) => {
    if (!indications.includes(service)) {
      setIndications([...indications, service]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleSubmit = () => {
    if (newClient.name && newClient.phone && newClient.email) {
      const newIndication = {
        id: Date.now(), // Gera um ID único
        client: newClient.name,
        phone: newClient.phone,
        email: newClient.email,
        services: indications,
        status: "Pendente"
      };
      onNewIndication(newIndication);
      alert(`Cliente indicado com sucesso! 
Nome: ${newClient.name}
Telefone: ${newClient.phone}
Email: ${newClient.email}
Serviços: ${indications.join(', ')}`);

      // Resetar os campos do formulário após o envio
      setNewClient({ name: '', phone: '', email: '' });
      setIndications([]);
    } else {
      alert('Por favor, preencha todos os campos do cliente.');
    }
  };

  return (
    <div className="user-dashboard">
      <h2>Bem-vindo, parceiro indicador!</h2>

      <div className="user-dashboard-header">
        <button onClick={() => setViewingStatus(!viewingStatus)}>
          {viewingStatus ? "Indicar Novo Cliente" : "Ver Status das Indicações"}
        </button>
      </div>

      {viewingStatus ? (
        <div className="indicated-clients">
          <h3>Status das Indicações</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Aqui podemos adicionar a lógica para exibir status dos clientes */}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="user-dashboard-content">
          <div className="new-indication">
            <h3>Indicar Novo Cliente</h3>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={newClient.name}
                onChange={handleFormChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Telefone"
                value={newClient.phone}
                onChange={handleFormChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newClient.email}
                onChange={handleFormChange}
                required
              />
            </form>
          </div>

          <div className="services-section">
            <h3>Selecione os serviços a serem indicados</h3>
            <table className="services-table">
              <thead>
                <tr>
                  <th>Serviço</th>
                  <th>Selecionar</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index}>
                    <td>{service}</td>
                    <td>
                      <button
                        onClick={() => handleServiceSelection(service)}
                        className={indications.includes(service) ? 'selected' : ''}>
                        {indications.includes(service) ? 'Selecionado' : 'Selecionar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Botão único para enviar indicações */}
            <button onClick={handleSubmit}>Enviar Indicações</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;