import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import PatientSidebar from './components/PatientSidebar';
import DiagnosisHistory from './components/DiagnosisHistory';
import DiagnosticList from './components/DiagnosticList';
import PatientProfile from './components/PatientProfile';
import LabResults from './components/LabResults';
import { fetchJessicaTaylorData } from './services/patientApi';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allPatients, setAllPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const loadPatientData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { targetPatient, allPatients } = await fetchJessicaTaylorData();
      setAllPatients(allPatients);
      setSelectedPatient(targetPatient);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while fetching patient data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPatientData();
  }, [loadPatientData]);

  // Handler if user clicks another patient in sidebar (can view or keep focused on Jessica Taylor)
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="dashboard-app">
      {/* Top Navigation Bar */}
      <Header />

      {/* Main Content Area */}
      <main className="dashboard-main-container">
        {loading ? (
          <div className="state-container loading-state">
            <div className="spinner" />
            <p className="state-message">Loading patient medical records...</p>
          </div>
        ) : error ? (
          <div className="state-container error-state">
            <div className="error-icon" aria-hidden="true">⚠️</div>
            <h3 className="error-title">Unable to Load Patient Data</h3>
            <p className="state-message">{error}</p>
            <button type="button" className="retry-btn" onClick={loadPatientData}>
              Try Again
            </button>
          </div>
        ) : selectedPatient ? (
          <div className="dashboard-grid">
            {/* Column 1: Patients Sidebar */}
            <PatientSidebar
              patients={allPatients}
              selectedPatientName={selectedPatient.name}
              onSelectPatient={handleSelectPatient}
            />

            {/* Column 2: Central Medical Records */}
            <div className="dashboard-center-column">
              <DiagnosisHistory diagnosisHistory={selectedPatient.diagnosis_history} />
              <DiagnosticList diagnosticList={selectedPatient.diagnostic_list} />
            </div>

            {/* Column 3: Patient Profile & Lab Results */}
            <div className="dashboard-right-column">
              <PatientProfile patient={selectedPatient} />
              <LabResults labResults={selectedPatient.lab_results} />
            </div>
          </div>
        ) : (
          <div className="state-container empty-state">
            <p className="state-message">No patient record selected.</p>
          </div>
        )}
      </main>
    </div>
  );
}
