import React from 'react';

export default function LabResults({ labResults = [] }) {
  return (
    <section className="dashboard-card lab-results-card" aria-label="Lab Results">
      <h2 className="section-title">Lab Results</h2>

      <div className="lab-results-scroll-container">
        <ul className="lab-results-list">
          {labResults && labResults.length > 0 ? (
            labResults.map((resultName, index) => (
              <li key={`${resultName}-${index}`} className="lab-result-item">
                <span className="lab-result-name">{resultName}</span>
                <button
                  type="button"
                  className="icon-btn download-btn"
                  aria-label={`Download ${resultName}`}
                  onClick={() => {
                    // Optional feedback since download endpoint is not supplied
                    console.log(`Downloading report for ${resultName}...`);
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#072635" strokeWidth="2">
                    <path d="M10 3V14M10 14L5 9M10 14L15 9" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 17H17" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            ))
          ) : (
            <li className="empty-state">No lab results available.</li>
          )}
        </ul>
      </div>
    </section>
  );
}
