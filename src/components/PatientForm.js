import React, { useState } from 'react';
import './PatientForm.css';

function PatientForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    symptoms: '',
    blood_pressure: '120/80',
    heart_rate: '',
    temperature: '',
    pre_existing_conditions: ''
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const predResponse = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: parseInt(formData.age),
          heart_rate: parseInt(formData.heart_rate),
          temperature: parseFloat(formData.temperature),
          blood_pressure: formData.blood_pressure
        })
      });
      const predData = await predResponse.json();
      setPrediction(predData);

      await fetch('http://localhost:5000/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, risk_level: predData.risk_level })
      });

      onSuccess();
      alert('Patient added successfully!');
      setFormData({ age: '', gender: 'Male', symptoms: '', blood_pressure: '120/80', heart_rate: '', temperature: '', pre_existing_conditions: '' });
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Patient Risk Assessment Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Heart Rate (bpm)</label>
          <input type="number" name="heart_rate" value={formData.heart_rate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Temperature (°C)</label>
          <input type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Blood Pressure</label>
          <input type="text" name="blood_pressure" value={formData.blood_pressure} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Symptoms</label>
          <textarea name="symptoms" value={formData.symptoms} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Pre-existing Conditions</label>
          <textarea name="pre_existing_conditions" value={formData.pre_existing_conditions} onChange={handleChange}></textarea>
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Analyzing...' : 'Submit & Assess Risk'}</button>
      </form>
      {prediction && (
        <div className={`prediction-result ${prediction.risk_level.toLowerCase()}`}>
          <h3>Risk Assessment Result</h3>
          <p><strong>Risk Level:</strong> {prediction.risk_level}</p>
          <p><strong>Risk Score:</strong> {prediction.risk_score}</p>
          <p><strong>Details:</strong> {prediction.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default PatientForm;