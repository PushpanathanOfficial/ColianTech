import React from 'react';

export default function DiagnosticList({ diagnosticList = [] }) {
  return (
    <section className="dashboard-card diagnostic-list-card">
      <h2 className="section-title">Diagnostic List</h2>
      
      <div className="table-responsive-wrapper">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th className="col-problem">Problem/Diagnosis</th>
              <th className="col-description">Description</th>
              <th className="col-status">Status</th>
            </tr>
          </thead>
          <tbody>
            {diagnosticList && diagnosticList.length > 0 ? (
              diagnosticList.map((item, index) => (
                <tr key={`${item.name}-${index}`}>
                  <td className="col-problem font-medium">{item.name}</td>
                  <td className="col-description">{item.description}</td>
                  <td className="col-status">{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="empty-cell">
                  No diagnostic records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
