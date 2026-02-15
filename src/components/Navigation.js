import React from 'react';
import './Navigation.css';

function Navigation({ setCurrentPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>🏥 AI Health Risk Assessment</h1>
      </div>
      <ul className="nav-links">
        <li><button onClick={() => setCurrentPage('dashboard')}>Dashboard</button></li>
        <li><button onClick={() => setCurrentPage('form')}>Add Patient</button></li>
        <li><button onClick={() => setCurrentPage('analytics')}>Analytics</button></li>
      </ul>
    </nav>
  );
}

export default Navigation;