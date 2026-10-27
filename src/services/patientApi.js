/**
 * Patient Data API Service
 * Handles authenticated communication with the Coalition Technologies Patient Data API.
 */

const API_ENDPOINT = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const API_USERNAME = 'coalition';
const API_PASSWORD = 'skills-test';

/**
 * Dynamically generates the HTTP Basic Authentication header value at runtime.
 * Avoids hardcoding the encoded string as specified in the test requirements.
 */
export function getAuthHeader() {
  const credentials = `${API_USERNAME}:${API_PASSWORD}`;
  // btoa generates Base64 encoded string in browser environments
  const encoded = typeof window !== 'undefined' && window.btoa
    ? window.btoa(credentials)
    : Buffer.from(credentials).toString('base64');
  return `Basic ${encoded}`;
}

/**
 * Fetches all patient records from the API.
 * @returns {Promise<Array>} Array of patient objects.
 */
export async function fetchPatients() {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        Authorization: getAuthHeader(),
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Invalid API response format: expected an array of patients.');
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch patient data:', error);
    throw error;
  }
}

/**
 * Fetches and locates Jessica Taylor's patient record.
 * @returns {Promise<{ targetPatient: Object, allPatients: Array }>}
 */
export async function fetchJessicaTaylorData() {
  const allPatients = await fetchPatients();
  const targetPatient = allPatients.find(
    (patient) => patient.name && patient.name.trim().toLowerCase() === 'jessica taylor'
  );

  if (!targetPatient) {
    throw new Error('Patient "Jessica Taylor" was not found in the API records.');
  }

  return { targetPatient, allPatients };
}
