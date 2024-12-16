import React, { useState } from 'react';

const services = [
  { category: "SISTEMAS", name: "Serviço Sistema 1" },
  { category: "SISTEMAS", name: "Serviço Sistema 2" },
  { category: "SISTEMAS", name: "Serviço Sistema 3" },
  { category: "MARKETING", name: "Serviço Marketing 1" },
  { category: "MARKETING", name: "Serviço Marketing 2" },
  { category: "MARKETING", name: "Serviço Marketing 3" },
  { category: "CERTIFICADO DIGITAL", name: "Serviço Certificado Digital 1" },
  { category: "CERTIFICADO DIGITAL", name: "Serviço Certificado Digital 2" },
  { category: "CERTIFICADO DIGITAL", name: "Serviço Certificado Digital 3" }
];

const UserDashboard = ({ onNewIndication, adminIndications }) => {
  const [newClient, setNewClient] = useState({ name: '', phone: '', email: '' });
  const [selectedServices, setSelectedServices] = useState({});
  const [viewingStatus, setViewingStatus] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [indications, setIndications] = useState([]);
  const [observations, setObservations] = useState('');

  const handleCategoryToggle = (category) => {
    setActiveCategory(activeCategory === category ? '' : category);
  };

  const handleServiceSelection = (category, serviceName) => {
    setSelectedServices((prevState) => {
      const selectedCategoryServices = prevState[category] || [];
      const updatedServices = selectedCategoryServices.includes(serviceName)
        ? selectedCategoryServices.filter(service => service !== serviceName)
        : [...selectedCategoryServices, serviceName];

      return {
        ...prevState,
        [category]: updatedServices
      };
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleObservationsChange = (e) => {
    setObservations(e.target.value);
  };

  const handleSubmit = () => {
    if (newClient.name && newClient.phone && newClient.email) {
      if (Object.values(selectedServices).flat().length === 0) {
        alert('Por favor, selecione pelo menos um serviço.');
        return;
      }

      const newIndication = {
        id: Date.now(),
        client: newClient.name,
        phone: newClient.phone,
        email: newClient.email,
        services: selectedServices,
        observations: observations,
        status: "Pendente"
      };

      setIndications([...indications, newIndication]);
      onNewIndication(newIndication);
      alert(`Cliente indicado com sucesso! 
      Nome: ${newClient.name}
      Telefone: ${newClient.phone}
      Email: ${newClient.email}
      Serviços: ${Object.values(selectedServices).flat().join(', ')}
      Observações: ${observations}`);

      setNewClient({ name: '', phone: '', email: '' });
      setSelectedServices({});
      setObservations('');
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
                <th>Serviços Indicados</th>
                <th>Observações</th>
                <th>Observação do Admin</th>
              </tr>
            </thead>
            <tbody>
              {indications.map((indication) => (
                <tr key={indication.id}>
                  <td>{indication.client}</td>
                  <td>{indication.status}</td>
                  <td>
                    {Object.values(indication.services)
                      .flat()
                      .join(', ')}
                  </td>
                  <td>{indication.observations}</td>
                  <td>{indication.adminObservation || 'Nenhuma observação'}</td>
                </tr>
              ))}
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
              <textarea
                name="observations"
                placeholder="Observações"
                value={observations}
                onChange={handleObservationsChange}
                rows="4"
              />
            </form>
          </div>

          <div className="services-section">
            <h3>Selecione os serviços a serem indicados</h3>

            <table className="services-table">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Serviço</th>
                  <th>Selecionar</th>
                </tr>
              </thead>
              <tbody>
                {['SISTEMAS', 'MARKETING', 'CERTIFICADO DIGITAL'].map((category) => (
                  <React.Fragment key={category}>
                    <tr onClick={() => handleCategoryToggle(category)} className="category-row">
                      <td colSpan="3" style={{ cursor: 'pointer', backgroundColor: '#e0e0e0' }}>
                        <strong>{category}</strong>
                      </td>
                    </tr>
                    {activeCategory === category && services
                      .filter(service => service.category === category)
                      .map((service) => (
                        <tr key={service.name}>
                          <td></td>
                          <td>{service.name}</td>
                          <td>
                            <button
                              onClick={() => handleServiceSelection(category, service.name)}
                              className={selectedServices[category]?.includes(service.name) ? 'selected' : ''}
                            >
                              {selectedServices[category]?.includes(service.name) ? 'Selecionado' : 'Selecionar'}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <button onClick={handleSubmit}>Enviar Indicações</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;