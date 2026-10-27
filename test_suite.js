import assert from 'node:assert';
import {
  sortDiagnosisHistoryChronological,
  getLatestDiagnosisRecord,
  getRecentDiagnosisRecords,
  formatMonthYearLabel,
  formatFullBirthDate,
  prepareBloodPressureChartData
} from './src/utils/patientHelpers.js';
import { getAuthHeader, fetchJessicaTaylorData } from './src/services/patientApi.js';

console.log('--- RUNNING INTEGRATION & UNIT VERIFICATION SUITE ---');

// Test 1: Runtime Basic Auth Generation
console.log('Test 1: Dynamic Basic Auth Header...');
const authHeader = getAuthHeader();
const expectedAuth = 'Basic ' + Buffer.from('coalition:skills-test').toString('base64');
assert.strictEqual(authHeader, expectedAuth, 'Auth header must match dynamically generated Base64 string');
console.log('✓ Test 1 Passed: Dynamic Basic Auth Header is correct (' + authHeader + ')');

// Test 2: Date Formatting
console.log('Test 2: Full Birth Date Formatting...');
const formattedDate = formatFullBirthDate('08/23/1996');
assert.strictEqual(formattedDate, 'August 23, 1996', 'Date must be converted to "August 23, 1996"');
console.log('✓ Test 2 Passed: Date formatting matches mockup ("August 23, 1996")');

// Test 3: Month and Year Label
console.log('Test 3: Month/Year Label formatting...');
const label1 = formatMonthYearLabel('March', 2024);
assert.strictEqual(label1, 'Mar, 2024');
const label2 = formatMonthYearLabel('October', 2023);
assert.strictEqual(label2, 'Oct, 2023');
console.log('✓ Test 3 Passed: Labels formatted correctly (Oct, 2023 and Mar, 2024)');

// Test 4: Chronological Sorting of Diagnosis History
console.log('Test 4: Chronological Sorting...');
const sampleHistory = [
  { month: 'March', year: 2024 },
  { month: 'October', year: 2023 },
  { month: 'December', year: 2023 },
  { month: 'January', year: 2024 }
];
const sorted = sortDiagnosisHistoryChronological(sampleHistory);
assert.strictEqual(sorted[0].month, 'October');
assert.strictEqual(sorted[0].year, 2023);
assert.strictEqual(sorted[sorted.length - 1].month, 'March');
assert.strictEqual(sorted[sorted.length - 1].year, 2024);
console.log('✓ Test 4 Passed: Chronological ordering verified');

// Test 5: Live API Integration & Jessica Taylor Target Extraction
console.log('Test 5: Live API Request & Target Patient Selection...');
try {
  const { targetPatient, allPatients } = await fetchJessicaTaylorData();
  assert.ok(Array.isArray(allPatients), 'All patients should be an array');
  assert.ok(allPatients.length > 0, 'Patient list should not be empty');
  assert.strictEqual(targetPatient.name, 'Jessica Taylor');
  assert.strictEqual(targetPatient.gender, 'Female');
  assert.strictEqual(targetPatient.age, 28);
  console.log(`✓ Test 5 Passed: Successfully retrieved ${allPatients.length} patients and located Jessica Taylor`);

  // Test 6: Chart Data Preparation from Live Jessica Record
  console.log('Test 6: Chart Data Preparation from Live API data...');
  const recent6 = getRecentDiagnosisRecords(targetPatient.diagnosis_history, 6);
  assert.strictEqual(recent6.length, 6, 'Must retrieve 6 recent records');
  const chartData = prepareBloodPressureChartData(recent6);
  assert.strictEqual(chartData.labels.length, 6);
  assert.strictEqual(chartData.datasets.length, 2);
  assert.strictEqual(chartData.datasets[0].label, 'Systolic');
  assert.strictEqual(chartData.datasets[1].label, 'Diastolic');
  // Check latest values (March 2024)
  assert.strictEqual(chartData.datasets[0].data[5], 160);
  assert.strictEqual(chartData.datasets[1].data[5], 78);
  console.log('✓ Test 6 Passed: Chart data mapped accurately (Sys: 160, Dia: 78 in March 2024)');

  console.log('\n===========================================');
  console.log('ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
  console.log('===========================================');
} catch (err) {
  console.error('API Test Error:', err);
  process.exit(1);
}
