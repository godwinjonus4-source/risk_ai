import React from 'react';
import './Dashboard.css';

function Dashboard({ patients }) {
  const totalPatients = patients.length;
  const highRiskPatients = patients.filter(p => p.risk_level === 'High' || p.risk_level === 'Critical').length;
  const criticalPatients = patients.filter(p => p.risk_level === 'Critical').length;

  return (
    <div className="dashboard">
      <h2>Hospital Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <p className="stat-number">{totalPatients}</p>
        </div>
        <div className="stat-card high-risk">
          <h3>High Risk Patients</h3>
          <p className="stat-number">{highRiskPatients}</p>
        </div>
        <div className="stat-card critical">
          <h3>Critical Patients</h3>
          <p className="stat-number">{criticalPatients}</p>
        </div>
      </div>
      <div className="patients-table">
        <h3>Recent Patient Entries</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Heart Rate</th>
              <th>Temperature</th>
              <th>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.heart_rate}</td>
                <td>{patient.temperature}°C</td>
                <td><span className={`badge ${patient.risk_level?.toLowerCase()}`}>{patient.risk_level}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;