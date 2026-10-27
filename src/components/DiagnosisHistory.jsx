import React from 'react';
import BloodPressureChart from './BloodPressureChart';
import VitalSigns from './VitalSigns';

export default function DiagnosisHistory({ diagnosisHistory = [] }) {
  return (
    <section className="dashboard-card diagnosis-history-card">
      <h2 className="section-title">Diagnosis History</h2>
      <BloodPressureChart diagnosisHistory={diagnosisHistory} />
      <VitalSigns diagnosisHistory={diagnosisHistory} />
    </section>
  );
}
