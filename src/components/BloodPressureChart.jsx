import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  getRecentDiagnosisRecords,
  getLatestDiagnosisRecord,
  prepareBloodPressureChartData
} from '../utils/patientHelpers';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function BloodPressureChart({ diagnosisHistory = [] }) {
  const recentRecords = getRecentDiagnosisRecords(diagnosisHistory, 6);
  const latestRecord = getLatestDiagnosisRecord(diagnosisHistory);

  const chartData = prepareBloodPressureChartData(recentRecords);

  const systolic = latestRecord?.blood_pressure?.systolic || {
    value: '--',
    levels: 'Normal'
  };
  const diastolic = latestRecord?.blood_pressure?.diastolic || {
    value: '--',
    levels: 'Normal'
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 5,
        right: 15
      }
    },
    plugins: {
      legend: {
        display: false // We render custom legend and statistics matching the Adobe XD layout
      },
      tooltip: {
        backgroundColor: '#072635',
        titleFont: { family: 'Manrope', size: 12 },
        bodyFont: { family: 'Manrope', size: 12 },
        padding: 8,
        cornerRadius: 6,
        displayColors: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            family: 'Manrope',
            size: 12
          },
          color: '#072635'
        }
      },
      y: {
        min: 60,
        max: 180,
        ticks: {
          stepSize: 20,
          font: {
            family: 'Manrope',
            size: 12
          },
          color: '#072635'
        },
        grid: {
          color: '#E0DCED',
          lineWidth: 1,
          drawBorder: false
        }
      }
    }
  };

  // Helper for trend arrow
  const renderTrendIcon = (levels = '') => {
    const l = levels.toLowerCase();
    if (l.includes('higher')) {
      return (
        <span className="trend-arrow up" aria-hidden="true">
          ▲
        </span>
      );
    }
    if (l.includes('lower')) {
      return (
        <span className="trend-arrow down" aria-hidden="true">
          ▼
        </span>
      );
    }
    return null;
  };

  return (
    <div className="bp-card">
      <div className="bp-chart-column">
        <div className="bp-header">
          <h3 className="bp-title">Blood Pressure</h3>
          <div className="bp-timeframe">
            <span>Last 6 months</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#072635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="bp-canvas-wrapper">
          <Line data={chartData} options={options} />
        </div>
      </div>

      <div className="bp-stats-column">
        {/* Systolic Stat */}
        <div className="bp-stat-item">
          <div className="bp-stat-header">
            <span className="legend-dot systolic" />
            <span className="bp-stat-label">Systolic</span>
          </div>
          <div className="bp-stat-value">{systolic.value}</div>
          <div className="bp-stat-level">
            {renderTrendIcon(systolic.levels)}
            <span>{systolic.levels}</span>
          </div>
        </div>

        <div className="bp-divider" />

        {/* Diastolic Stat */}
        <div className="bp-stat-item">
          <div className="bp-stat-header">
            <span className="legend-dot diastolic" />
            <span className="bp-stat-label">Diastolic</span>
          </div>
          <div className="bp-stat-value">{diastolic.value}</div>
          <div className="bp-stat-level">
            {renderTrendIcon(diastolic.levels)}
            <span>{diastolic.levels}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
