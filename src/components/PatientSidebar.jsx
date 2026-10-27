import React from 'react';

export default function PatientSidebar({
  patients = [],
  selectedPatientName = 'Jessica Taylor',
  onSelectPatient
}) {
  return (
    <aside className="patient-sidebar" aria-label="Patients List">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Patients</h2>
        <button type="button" className="icon-btn search-btn" aria-label="Search patients">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#072635" strokeWidth="2">
            <circle cx="7.5" cy="7.5" r="5.5" />
            <line x1="11.5" y1="11.5" x2="16" y2="16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="patients-scroll-container">
        <ul className="patient-list">
          {patients.map((patient, index) => {
            const isSelected =
              patient.name &&
              patient.name.trim().toLowerCase() === selectedPatientName.trim().toLowerCase();

            return (
              <li key={`${patient.name}-${index}`}>
                <div
                  className={`patient-card ${isSelected ? 'selected' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectPatient && onSelectPatient(patient)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onSelectPatient && onSelectPatient(patient);
                    }
                  }}
                >
                  <img
                    src={patient.profile_picture}
                    alt={patient.name}
                    className="patient-thumb"
                    onError={(e) => {
                      // Fallback initials avatar
                      e.currentTarget.src =
                        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="%23E0F3FA"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23072635">' +
                        (patient.name ? patient.name.charAt(0) : 'P') +
                        '</text></svg>';
                    }}
                  />
                  <div className="patient-info">
                    <span className="patient-name">{patient.name}</span>
                    <span className="patient-meta">
                      {patient.gender}, {patient.age}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="icon-btn patient-more-btn"
                    aria-label={`Options for ${patient.name}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="18" height="4" viewBox="0 0 18 4" fill="#072635">
                      <circle cx="2" cy="2" r="2" />
                      <circle cx="9" cy="2" r="2" />
                      <circle cx="16" cy="2" r="2" />
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
