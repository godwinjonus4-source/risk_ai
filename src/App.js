import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import PatientForm from './components/PatientForm';
import Navigation from './components/Navigation';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  return (
    <div className="app">
      <Navigation setCurrentPage={setCurrentPage} />
      <div className="main-content">
        {currentPage === 'dashboard' && <Dashboard patients={patients} />}
        {currentPage === 'form' && <PatientForm onSuccess={fetchPatients} />}
      </div>
    </div>
  );
}

export default App;