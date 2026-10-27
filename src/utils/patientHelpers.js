/**
 * Utility functions for manipulating patient records, formatting dates,
 * and preparing Chart.js blood pressure series.
 */

const MONTH_INDEX_MAP = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Parses month string (e.g. "March", "Mar", "03") to a 0-based month index.
 */
function getMonthIndex(monthStr) {
  if (typeof monthStr === 'number') return monthStr - 1;
  if (!monthStr) return 0;
  const cleaned = String(monthStr).trim().toLowerCase();
  if (MONTH_INDEX_MAP[cleaned] !== undefined) {
    return MONTH_INDEX_MAP[cleaned];
  }
  // Check 3-letter prefix
  for (const [name, index] of Object.entries(MONTH_INDEX_MAP)) {
    if (name.startsWith(cleaned) || cleaned.startsWith(name.slice(0, 3))) {
      return index;
    }
  }
  const parsed = parseInt(cleaned, 10);
  if (!isNaN(parsed) && parsed >= 1 && parsed <= 12) {
    return parsed - 1;
  }
  return 0;
}

/**
 * Sorts diagnosis history entries chronologically from oldest to newest.
 */
export function sortDiagnosisHistoryChronological(history = []) {
  if (!Array.isArray(history)) return [];
  return [...history].sort((a, b) => {
    const yearA = Number(a.year) || 0;
    const yearB = Number(b.year) || 0;
    if (yearA !== yearB) return yearA - yearB;
    return getMonthIndex(a.month) - getMonthIndex(b.month);
  });
}

/**
 * Retrieves the latest applicable record from diagnosis history.
 */
export function getLatestDiagnosisRecord(history = []) {
  const sorted = sortDiagnosisHistoryChronological(history);
  return sorted.length > 0 ? sorted[sorted.length - 1] : null;
}

/**
 * Returns the most recent N diagnosis records in chronological order.
 * Follows the 6-month visual window shown in the reference design.
 */
export function getRecentDiagnosisRecords(history = [], count = 6) {
  const sorted = sortDiagnosisHistoryChronological(history);
  return sorted.slice(-count);
}

/**
 * Formats a month and year into the design's standard label format: "Mon, YYYY" (e.g. "Oct, 2023").
 */
export function formatMonthYearLabel(month, year) {
  const idx = getMonthIndex(month);
  const monthShort = MONTH_NAMES[idx].slice(0, 3);
  return `${monthShort}, ${year}`;
}

/**
 * Converts date strings such as "08/23/1996" or "1996-08-23" into "August 23, 1996"
 * to match the Adobe XD reference design.
 */
export function formatFullBirthDate(dateStr) {
  if (!dateStr) return '';
  // Test MM/DD/YYYY format
  const parts = dateStr.split(/[\/\-]/);
  if (parts.length === 3) {
    let month, day, year;
    if (parts[0].length === 4) {
      // YYYY-MM-DD
      [year, month, day] = parts;
    } else {
      // MM/DD/YYYY
      [month, day, year] = parts;
    }
    const mIdx = parseInt(month, 10) - 1;
    const dVal = parseInt(day, 10);
    if (mIdx >= 0 && mIdx < 12 && !isNaN(dVal)) {
      return `${MONTH_NAMES[mIdx]} ${dVal}, ${year}`;
    }
  }
  return dateStr;
}

/**
 * Prepares datasets and labels for Chart.js from recent diagnosis records.
 */
export function prepareBloodPressureChartData(recentRecords = []) {
  const labels = recentRecords.map(r => formatMonthYearLabel(r.month, r.year));
  const systolicValues = recentRecords.map(r => r.blood_pressure?.systolic?.value ?? null);
  const diastolicValues = recentRecords.map(r => r.blood_pressure?.diastolic?.value ?? null);

  return {
    labels,
    datasets: [
      {
        label: 'Systolic',
        data: systolicValues,
        borderColor: '#C26EB4',
        backgroundColor: '#C26EB4',
        pointBackgroundColor: '#E66FD2',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.45,
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Diastolic',
        data: diastolicValues,
        borderColor: '#7E6CAB',
        backgroundColor: '#7E6CAB',
        pointBackgroundColor: '#8C6FE6',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.45,
        borderWidth: 2,
        fill: false
      }
    ]
  };
}
