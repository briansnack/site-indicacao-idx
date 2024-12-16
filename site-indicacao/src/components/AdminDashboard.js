import React, { useState, useEffect } from 'react';

// Lista inicial de indicações para demonstração
const initialAdminIndications = [
  { id: 1, client: "Cliente 1", service: "Serviço 1", status: "Fechado" },
  { id: 2, client: "Cliente 2", service: "Serviço 2", status: "Negociação" },
  { id: 3, client: "Cliente 3", service: "Serviço 3", status: "Negado" }
];

const AdminDashboard = ({ newIndications = [] }) => {
  const [indications, setIndications] = useState([...initialAdminIndications, ...newIndications]);
  const [statusMap, setStatusMap] = useState(
    indications.reduce((acc, ind) => {
      acc[ind.id] = ind.status;
      return acc;
    }, {})
  );

  useEffect(() => {
    setIndications([...initialAdminIndications, ...newIndications]);
  }, [newIndications]);

  const handleStatusChange = (id, newStatus) => {
    setStatusMap((prevStatusMap) => ({ ...prevStatusMap, [id]: newStatus }));
    setIndications((prevIndications) =>
      prevIndications.map((indication) =>
        indication.id === id ? { ...indication, status: newStatus } : indication
      )
    );
    alert(`Status do cliente ${id} alterado para "${newStatus}"`);
  };

  return (
    <div className="admin-dashboard">
      <h2>Painel do Admin</h2>

      <div className="admin-indications">
        <h3>Indicações</h3>
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Serviço Indicado</th>
              <th>Status</th>
              <th>Alterar Status</th>
            </tr>
          </thead>
          <tbody>
            {indications.map(indication => (
              <tr key={indication.id}>
                <td>{indication.client}</td>
                <td>{indication.service}</td>
                <td>{statusMap[indication.id]}</td>
                <td>
                  <select
                    value={statusMap[indication.id]}
                    onChange={(e) => handleStatusChange(indication.id, e.target.value)}
                  >
                    <option value="Fechado">Fechado</option>
                    <option value="Negociação">Negociação</option>
                    <option value="Negado">Negado</option>
                  </select>
                  <button onClick={() => handleStatusChange(indication.id, statusMap[indication.id])}>
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