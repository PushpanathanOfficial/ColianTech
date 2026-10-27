import React from 'react';
import { formatFullBirthDate } from '../utils/patientHelpers';

export default function PatientProfile({ patient }) {
  if (!patient) {
    return (
      <aside className="dashboard-card patient-profile-card">
        <div className="empty-state">No patient data available.</div>
      </aside>
    );
  }

  const birthDateFormatted = formatFullBirthDate(patient.date_of_birth);

  return (
    <aside className="dashboard-card patient-profile-card" aria-label="Patient Profile">
      {/* Patient Avatar & Name */}
      <div className="profile-header">
        <div className="profile-avatar-container">
          <img
            src={patient.profile_picture}
            alt={patient.name}
            className="profile-avatar"
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="%23E0F3FA"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="64" font-weight="bold" fill="%23072635">JT</text></svg>';
            }}
          />
        </div>
        <h2 className="profile-name">{patient.name}</h2>
      </div>

      {/* Demographic & Contact Details */}
      <div className="profile-details-list">
        {/* Date Of Birth */}
        <div className="detail-item">
          <div className="detail-icon-circle" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#072635" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="detail-meta">
            <span className="detail-label">Date Of Birth</span>
            <span className="detail-value">{birthDateFormatted || patient.date_of_birth}</span>
          </div>
        </div>

        {/* Gender */}
        <div className="detail-item">
          <div className="detail-icon-circle" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#072635" strokeWidth="2">
              <circle cx="12" cy="9" r="6" />
              <path d="M12 15V22M9 19H15" />
            </svg>
          </div>
          <div className="detail-meta">
            <span className="detail-label">Gender</span>
            <span className="detail-value">{patient.gender}</span>
          </div>
        </div>

        {/* Contact Info. */}
        <div className="detail-item">
          <div className="detail-icon-circle" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#072635" strokeWidth="2">
              <path d="M22 16.92V20a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.08 4.18 2 2 0 014.06 2h3.09a2 2 0 012 1.72 12.05 12.05 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.05 12.05 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </div>
          <div className="detail-meta">
            <span className="detail-label">Contact Info.</span>
            <span className="detail-value">{patient.phone_number}</span>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="detail-item">
          <div className="detail-icon-circle" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#072635" strokeWidth="2">
              <path d="M22 16.92V20a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.08 4.18 2 2 0 014.06 2h3.09a2 2 0 012 1.72 12.05 12.05 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.05 12.05 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </div>
          <div className="detail-meta">
            <span className="detail-label">Emergency Contacts</span>
            <span className="detail-value">{patient.emergency_contact}</span>
          </div>
        </div>

        {/* Insurance Provider */}
        <div className="detail-item">
          <div className="detail-icon-circle" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#072635" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="detail-meta">
            <span className="detail-label">Insurance Provider</span>
            <span className="detail-value">{patient.insurance_type}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="profile-action">
        <button type="button" className="show-info-btn">
          Show All Information
        </button>
      </div>
    </aside>
  );
}
