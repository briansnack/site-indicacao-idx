import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ newIndications = [] }) => {
  const [indications, setIndications] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [adminObservations, setAdminObservations] = useState({});
  
  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');

  useEffect(() => {
    // Buscar indicações do backend ao carregar o componente
    const fetchIndications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/indications');
        setIndications(response.data);
        const initialStatusMap = response.data.reduce((acc, ind) => {
          acc[ind.id] = ind.status;
          return acc;
        }, {});
        setStatusMap(initialStatusMap);
      } catch (error) {
        console.error('Erro ao carregar indicações:', error);
      }
    };

    fetchIndications();
  }, []);

  const handleStatusChange = async (id, newStatus, observation) => {
    setStatusMap((prevStatusMap) => ({ ...prevStatusMap, [id]: newStatus }));
    setIndications((prevIndications) =>
      prevIndications.map((indication) =>
        indication.id === id ? { ...indication, status: newStatus, adminObservation: observation } : indication
      )
    );

    try {
      // Atualizar o status e observação no backend
      await axios.put(`http://localhost:5000/api/indications/${id}`, {
        status: newStatus,
        adminObservation: observation,
      });

      alert(`Status do cliente ${id} alterado para "${newStatus}" com observação: "${observation}"`);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const handleFilterChange = (e, type) => {
    const value = e.target.value;
    if (type === 'name') {
      setFilterName(value);
    } else {
      setFilterEmail(value);
    }
  };

  const filteredIndications = indications.filter((indication) =>
    indication.referrer.name.toLowerCase().includes(filterName.toLowerCase()) &&
    indication.referrer.email.toLowerCase().includes(filterEmail.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h2>Painel do Admin</h2>

      <div className="filters">
        <div>
          <label>Filtrar por Nome do Parceiro:</label>
          <input
            type="text"
            value={filterName}
            onChange={(e) => handleFilterChange(e, 'name')}
            placeholder="Nome do parceiro"
          />
        </div>
        <div>
          <label>Filtrar por Email do Parceiro:</label>
          <input
            type="email"
            value={filterEmail}
            onChange={(e) => handleFilterChange(e, 'email')}
            placeholder="Email do parceiro"
          />
        </div>
      </div>

      <div className="admin-indications">
        <h3>Indicações</h3>
        <table className="admin-indications-table">
          <thead>
            <tr>
              <th>Indicado (Nome, Telefone, Email)</th>
              <th>Parceiro (Nome, Email)</th>
              <th>Serviço Indicado</th>
              <th>Status</th>
              <th>Observação do Indicador</th>
              <th>Observação do Admin</th>
              <th>Alterar Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredIndications.map((indication) => (
              <tr key={indication.id}>
                <td>
                  {indication.indicated.name}<br />
                  {indication.indicated.phone}<br />
                  {indication.indicated.email}
                </td>
                <td>
                  {indication.referrer.name}<br />
                  {indication.referrer.email}
                </td>
                <td>{indication.service}</td>
                <td>{statusMap[indication.id]}</td>
                <td>{indication.observations}</td>
                <td>
                  <textarea
                    placeholder="Observação do Admin"
                    value={adminObservations[indication.id] || ''}
                    onChange={(e) => setAdminObservations({ ...adminObservations, [indication.id]: e.target.value })}
                  />
                </td>
                <td>
                  <select
                    value={statusMap[indication.id] || 'Fechado'}
                    onChange={(e) => handleStatusChange(indication.id, e.target.value, adminObservations[indication.id])}
                  >
                    <option value="Fechado">Fechado</option>
                    <option value="Negociação">Negociação</option>
                    <option value="Negado">Negado</option>
                  </select>
                  <button onClick={() => handleStatusChange(indication.id, statusMap[indication.id], adminObservations[indication.id])}>
                    Atualizar Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;