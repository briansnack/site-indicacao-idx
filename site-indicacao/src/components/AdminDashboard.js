import React, { useState, useEffect } from 'react';

// Lista inicial de indicações para demonstração
const initialAdminIndications = [
  {
    id: 1,
    client: "Cliente 1",
    service: "Serviço 1",
    status: "Fechado",
    indicated: { name: "Indicado 1", phone: "123456789", email: "indicado1@example.com" },
    referrer: { name: "Parceiro 1", email: "parceiro1@example.com" },
    observations: "Observação inicial 1"
  },
  {
    id: 2,
    client: "Cliente 2",
    service: "Serviço 2",
    status: "Negociação",
    indicated: { name: "Indicado 2", phone: "987654321", email: "indicado2@example.com" },
    referrer: { name: "Parceiro 2", email: "parceiro2@example.com" },
    observations: "Observação inicial 2"
  },
  {
    id: 3,
    client: "Cliente 3",
    service: "Serviço 3",
    status: "Negado",
    indicated: { name: "Indicado 3", phone: "1122334455", email: "indicado3@example.com" },
    referrer: { name: "Parceiro 3", email: "parceiro3@example.com" },
    observations: "Observação inicial 3"
  }
];

const AdminDashboard = ({ newIndications = [] }) => {
  const [indications, setIndications] = useState([...initialAdminIndications, ...newIndications]);
  const [statusMap, setStatusMap] = useState(
    indications.reduce((acc, ind) => {
      acc[ind.id] = ind.status;
      return acc;
    }, {})
  );
  const [tempStatusMap, setTempStatusMap] = useState({});
  const [adminObservations, setAdminObservations] = useState({});

  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');

  useEffect(() => {
    setIndications([...initialAdminIndications, ...newIndications]);
  }, [newIndications]);

  const handleTempStatusChange = (id, newStatus) => {
    setTempStatusMap((prevTempStatusMap) => ({ ...prevTempStatusMap, [id]: newStatus }));
  };

  const handleAdminObservationChange = (id, observation) => {
    setAdminObservations((prevObservations) => ({ ...prevObservations, [id]: observation }));
  };

  const handleStatusChange = (id) => {
    const newStatus = tempStatusMap[id] || statusMap[id];
    const newObservation = adminObservations[id] || '';

    setStatusMap((prevStatusMap) => ({ ...prevStatusMap, [id]: newStatus }));
    setIndications((prevIndications) =>
      prevIndications.map((indication) =>
        indication.id === id ? { ...indication, status: newStatus, adminObservation: newObservation } : indication
      )
    );
    alert(`Status do cliente ${id} alterado para "${newStatus}" com observação: "${newObservation}"`);
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
            {filteredIndications.map(indication => (
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
                <td>{indication.observations}</td> {/* Observação do Indicador */}
                <td>
                  <textarea
                    placeholder="Observação do Admin"
                    value={adminObservations[indication.id] || ''}
                    onChange={(e) => handleAdminObservationChange(indication.id, e.target.value)}
                  />
                </td>
                <td>
                  <select
                    value={tempStatusMap[indication.id] || statusMap[indication.id]}
                    onChange={(e) => handleTempStatusChange(indication.id, e.target.value)}
                  >
                    <option value="Fechado">Fechado</option>
                    <option value="Negociação">Negociação</option>
                    <option value="Negado">Negado</option>
                  </select>
                  <button onClick={() => handleStatusChange(indication.id)}>
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