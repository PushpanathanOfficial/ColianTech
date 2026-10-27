import React from 'react';
import { getLatestDiagnosisRecord } from '../utils/patientHelpers';

export default function VitalSigns({ diagnosisHistory = [] }) {
  const latest = getLatestDiagnosisRecord(diagnosisHistory);

  const respiratory = latest?.respiratory_rate || {
    value: 20,
    levels: 'Normal'
  };
  const temperature = latest?.temperature || {
    value: 98.6,
    levels: 'Normal'
  };
  const heartRate = latest?.heart_rate || {
    value: 78,
    levels: 'Lower than Average'
  };

  const renderTrendIcon = (levels = '') => {
    const l = String(levels).toLowerCase();
    if (l.includes('higher')) {
      return <span className="vital-arrow up">▲</span>;
    }
    if (l.includes('lower')) {
      return <span className="vital-arrow down">▼</span>;
    }
    return null;
  };

  return (
    <div className="vital-signs-grid">
      {/* Respiratory Rate Card */}
      <div className="vital-card respiratory">
        <div className="vital-icon-wrapper">
          <svg width="48" height="48" viewBox="0 0 96 96" fill="none">
            <circle cx="48" cy="48" r="48" fill="#FFFFFF" />
            {/* Lungs Graphic */}
            <path
              d="M48 24V44M48 44L38 52M48 44L58 52"
              stroke="#072635"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M34 46C31 46 26 50 26 60C26 71 34 74 41 72C43 71.5 45 68 45 63V46H34Z"
              fill="#74CEF5"
            />
            <path
              d="M62 46C65 46 70 50 70 60C70 71 62 74 55 72C53 71.5 51 68 51 63V46H62Z"
              fill="#74CEF5"
            />
          </svg>
        </div>
        <div className="vital-content">
          <span className="vital-label">Respiratory Rate</span>
          <div className="vital-value">{respiratory.value} bpm</div>
          <div className="vital-status">
            {renderTrendIcon(respiratory.levels)}
            <span>{respiratory.levels}</span>
          </div>
        </div>
      </div>

      {/* Temperature Card */}
      <div className="vital-card temperature">
        <div className="vital-icon-wrapper">
          <svg width="48" height="48" viewBox="0 0 96 96" fill="none">
            <circle cx="48" cy="48" r="48" fill="#FFFFFF" />
            {/* Thermometer Graphic */}
            <rect x="44" y="24" width="8" height="34" rx="4" fill="#F05B66" />
            <circle cx="48" cy="62" r="12" fill="#F05B66" />
            <circle cx="48" cy="62" r="6" fill="#FFFFFF" />
            <line x1="48" y1="30" x2="48" y2="56" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="vital-content">
          <span className="vital-label">Temperature</span>
          <div className="vital-value">{temperature.value}°F</div>
          <div className="vital-status">
            {renderTrendIcon(temperature.levels)}
            <span>{temperature.levels}</span>
          </div>
        </div>
      </div>

      {/* Heart Rate Card */}
      <div className="vital-card heart-rate">
        <div className="vital-icon-wrapper">
          <svg width="48" height="48" viewBox="0 0 96 96" fill="none">
            <circle cx="48" cy="48" r="48" fill="#FFFFFF" />
            {/* Heart + Pulse Graphic */}
            <path
              d="M48 68L33 53.5C26 46.5 26 35.5 33 28.5C40 21.5 51 25.5 48 35.5C45 25.5 56 21.5 63 28.5C70 35.5 70 46.5 63 53.5L48 68Z"
              fill="#FF6280"
            />
            {/* Cardiogram line */}
            <path
              d="M33 46H41L44 40L48 52L52 44L55 46H63"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="vital-content">
          <span className="vital-label">Heart Rate</span>
          <div className="vital-value">{heartRate.value} bpm</div>
          <div className="vital-status">
            {renderTrendIcon(heartRate.levels)}
            <span>{heartRate.levels}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
