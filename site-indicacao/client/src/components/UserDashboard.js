import React, { useState, useEffect } from 'react';
import { getIndications, createIndication } from '../services/api';  

const UserDashboard = ({ userId }) => {
  const [newClient, setNewClient] = useState({ name: '', phone: '', email: '' });
  const [selectedServices, setSelectedServices] = useState({});
  const [viewingStatus, setViewingStatus] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [indications, setIndications] = useState([]);
  const [observations, setObservations] = useState('');

  // Mock de serviços
  const services = [
    { category: 'SISTEMAS', name: 'Sistema de Gestão de Frota' },
    { category: 'SISTEMAS', name: 'Sistema de Monitoramento Agrícola' },
    { category: 'MARKETING', name: 'Consultoria em Marketing Digital' },
    { category: 'MARKETING', name: 'Gestão de Redes Sociais' },
    { category: 'CERTIFICADO DIGITAL', name: 'Certificado Digital A1' },
    { category: 'CERTIFICADO DIGITAL', name: 'Certificado Digital A3' }
  ];

  // Fetch indications from backend or mock
  useEffect(() => {
    const fetchIndications = async () => {
      try {
        const response = await getIndications(userId);  
        setIndications(response);
      } catch (error) {
        console.error("Error fetching indications:", error);
      }
    };
    fetchIndications();
  }, [userId]);

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

  const handleSubmit = async () => {
    if (newClient.name && newClient.phone && newClient.email) {
      if (Object.values(selectedServices).flat().length === 0) {
        alert('Por favor, selecione pelo menos um serviço.');
        return;
      }
  
      const newIndication = {
        client: newClient.name,
        phone: newClient.phone,
        email: newClient.email,
        services: selectedServices,
        observations: observations,
        status: "Pendente",
        userId: userId
      };
  
      console.log("Dados enviados:", newIndication); 
  
      try {
        await createIndication(newIndication);
        alert(`Cliente indicado com sucesso! 
        Nome: ${newClient.name}
        Telefone: ${newClient.phone}
        Email: ${newClient.email}
        Serviços: ${Object.values(selectedServices).flat().join(', ')}
        Observações: ${observations}`);
  
        setNewClient({ name: '', phone: '', email: '' });
        setSelectedServices({});
        setObservations('');
        setIndications([...indications, newIndication]);
      } catch (error) {
        console.error('Error submitting indication:', error);
        alert('Erro ao enviar indicação. Tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos do cliente.');
    }
  };

  return (
    <div className="user-dashboard">
      <h2>Bem-vindo, parceiro indicador!</h2>
      <button onClick={() => setViewingStatus(!viewingStatus)}>
        {viewingStatus ? "Indicar Novo Cliente" : "Ver Status das Indicações"}
      </button>

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
                  <td>{Object.values(indication.services).flat().join(', ')}</td>
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
                              className={selectedServices[category]?.includes(service.name) ? 'selected' : ''}>
                              {selectedServices[category]?.includes(service.name) ? 'Selecionado' : 'Selecionar'}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <button onClick={handleSubmit}>Enviar Indicação</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;