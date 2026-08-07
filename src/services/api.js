// Unified API Client adhering to strict Backend Contracts
const DEFAULT_API_URL = 'http://localhost:8000';

// Local storage key for backend URL / Mock mode
const API_URL_KEY = 'aegis_api_base_url';
const MODE_KEY = 'aegis_api_mode'; // 'LIVE' or 'MOCK'

export function getApiConfig() {
  const baseUrl = localStorage.getItem(API_URL_KEY) || DEFAULT_API_URL;
  const mode = localStorage.getItem(MODE_KEY) || 'MOCK'; // Default to Mock for immediate zero-config demo
  return { baseUrl, mode };
}

export function setApiConfig(baseUrl, mode) {
  localStorage.setItem(API_URL_KEY, baseUrl);
  localStorage.setItem(MODE_KEY, mode);
}

// Generate or retrieve persistent session_id
export function getSessionId() {
  let sessionId = localStorage.getItem('aegis_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('aegis_session_id', sessionId);
  }
  return sessionId;
}

// Mock Response Engine matching exact backend contract schemas
const MOCK_HOSPITALS = [
  {
    id: 1,
    name: "St. Jude Emergency Medical Center",
    distance: "0.9 miles",
    eta: "3 mins",
    address: "104 Healthcare Blvd",
    phone: "911-0192",
    lat: 37.7749,
    lng: -122.4194
  },
  {
    id: 2,
    name: "Metro Trauma & Surgical Hospital",
    distance: "1.8 miles",
    eta: "6 mins",
    address: "550 Memorial Drive",
    phone: "911-0441",
    lat: 37.7833,
    lng: -122.4167
  },
  {
    id: 3,
    name: "Apex Regional Medical Clinic",
    distance: "3.2 miles",
    eta: "9 mins",
    address: "982 Medical Center Way",
    phone: "911-0812",
    lat: 37.7650,
    lng: -122.4300
  }
];

// Send Chat Message - POST /chat
export async function sendChatMessage(message, sessionId = getSessionId()) {
  const { baseUrl, mode } = getApiConfig();

  if (mode === 'LIVE') {
    try {
      const response = await fetch(`${baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, session_id: sessionId })
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn("Live backend call failed, falling back to mock:", err);
    }
  }

  // Realistic AI Mock Engine matching exact response contract
  await new Promise((r) => setTimeout(r, 800)); // Simulate AI processing delay

  const lowerMsg = message.toLowerCase();
  let severity = "MEDIUM";
  let emergencyType = "Medical";
  let reply = "I am processing your emergency request. Please describe your location and status.";
  let reasoning = "Standard query received. Evaluating emergency level.";
  let actions = [];

  if (lowerMsg.includes("collapse") || lowerMsg.includes("heart") || lowerMsg.includes("unconscious") || lowerMsg.includes("bleeding")) {
    severity = "CRITICAL";
    emergencyType = "Medical";
    reply = "🚨 **CRITICAL MEDICAL EMERGENCY DETECTED**: Keep the person lying flat, check their breathing, and ensure their airway is clear. An ambulance protocol recommendation has been issued.";
    reasoning = "High risk of cardiac or severe respiratory impairment based on reported collapse/unconsciousness.";
    actions = [
      { number: 1, title: "Check Airway & Pulse", description: "Clear mouth and tilt head back slightly to ensure open airway.", completed: true },
      { number: 2, title: "Call Emergency Response", description: "Contact local EMS (911) immediately.", completed: true },
      { number: 3, title: "Prepare CPR / AED", description: "If non-responsive with no normal breathing, begin chest compressions.", completed: false },
      { number: 4, title: "Clear Entry Way", description: "Unlock door and turn on outer porch light for paramedics.", completed: false }
    ];
  } else if (lowerMsg.includes("fire") || lowerMsg.includes("smoke") || lowerMsg.includes("flame")) {
    severity = "HIGH";
    emergencyType = "Fire";
    reply = "🔥 **FIRE EMERGENCY**: Evacuate the building immediately! Do not use elevators. Stay low beneath smoke.";
    reasoning = "Thermal hazard and toxic smoke inhalation threat identified.";
    actions = [
      { number: 1, title: "Evacuate Premises", description: "Exit building immediately using nearest emergency door.", completed: true },
      { number: 2, title: "Call Fire Brigade", description: "Alert fire dispatch center once outside safely.", completed: false },
      { number: 3, title: "Check Neighbors", description: "Notify occupants in adjacent units if safe to do so.", completed: false }
    ];
  } else if (lowerMsg.includes("accident") || lowerMsg.includes("crash") || lowerMsg.includes("car")) {
    severity = "HIGH";
    emergencyType = "Accident";
    reply = "🚗 **TRAFFIC ACCIDENT**: Turn on hazard lights, stay safe from oncoming traffic, and check for injuries.";
    reasoning = "Vehicular impact with risk of trauma or secondary traffic collision.";
    actions = [
      { number: 1, title: "Secure Scene", description: "Turn on hazard lights and set up warning triangle.", completed: true },
      { number: 2, title: "Assess Triage", description: "Check passengers for neck spinal injuries before moving.", completed: false },
      { number: 3, title: "Call Dispatch", description: "Share exact GPS location with traffic control.", completed: false }
    ];
  } else {
    actions = [
      { number: 1, title: "Confirm Location", description: "Share exact street address or GPS pin.", completed: true },
      { number: 2, title: "Stay on Line", description: "Keep device active for dispatch coordination.", completed: false }
    ];
  }

  // Store mock incident in local history
  saveMockIncident({
    id: Date.now(),
    session_id: sessionId,
    emergency_type: emergencyType,
    severity: severity,
    status: "Active",
    summary: message,
    timestamp: new Date().toLocaleTimeString()
  });

  return {
    reply: reply,
    reasoning: reasoning,
    severity: severity,
    actions: actions,
    hospital_recommendation: MOCK_HOSPITALS,
    memory_saved: true
  };
}

// POST /detect
export async function detectEmergency(message) {
  const { baseUrl, mode } = getApiConfig();

  if (mode === 'LIVE') {
    try {
      const response = await fetch(`${baseUrl}/detect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn("Detect API call failed", e);
    }
  }

  const lower = message.toLowerCase();
  let type = "Medical";
  let severity = "CRITICAL";
  let confidence = 0.96;

  if (lower.includes("fire")) type = "Fire";
  else if (lower.includes("crash") || lower.includes("car")) type = "Accident";
  else if (lower.includes("robbery") || lower.includes("thief")) type = "Crime";

  return { type, severity, confidence };
}

// POST /plan
export async function getPlan(emergencyType = "Medical") {
  return {
    steps: [
      { number: 1, title: "Assess Vital Signs", description: "Check consciousness, airway, breathing, and circulation.", completed: true },
      { number: 2, title: "Dispatch Paramedics", description: "Alert closest ambulance unit to current location.", completed: true },
      { number: 3, title: "Prepare Medical History", description: "Gather medication list and emergency contact info.", completed: false },
      { number: 4, title: "Clear Access Path", description: "Ensure front entrance and hallway are unobstructed.", completed: false }
    ]
  };
}

// GET /hospitals
export async function getHospitals(latitude = 37.7749, longitude = -122.4194) {
  const { baseUrl, mode } = getApiConfig();

  if (mode === 'LIVE') {
    try {
      const res = await fetch(`${baseUrl}/hospitals?latitude=${latitude}&longitude=${longitude}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Hospitals fetch failed", e);
    }
  }

  return { results: MOCK_HOSPITALS };
}

// GET /history/{session_id}
export async function getIncidentHistory(sessionId = getSessionId()) {
  const { baseUrl, mode } = getApiConfig();

  if (mode === 'LIVE') {
    try {
      const res = await fetch(`${baseUrl}/history/${sessionId}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("History fetch failed", e);
    }
  }

  const stored = localStorage.getItem('aegis_incident_history');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {}
  }

  // Default seed incidents if empty
  const defaultHistory = [
    {
      id: 101,
      session_id: sessionId,
      emergency_type: "Medical",
      severity: "CRITICAL",
      status: "Active",
      summary: "Father collapsed in living room, unresponsive",
      timestamp: "Today, 12:40 PM"
    },
    {
      id: 98,
      session_id: sessionId,
      emergency_type: "Fire",
      severity: "HIGH",
      status: "Resolved",
      summary: "Electrical smoke reported near kitchen outlet",
      timestamp: "Yesterday, 04:15 PM"
    }
  ];
  localStorage.setItem('aegis_incident_history', JSON.stringify(defaultHistory));
  return defaultHistory;
}

// GET /incident/{id}
export async function getIncidentDetails(id) {
  const history = await getIncidentHistory();
  return history.find((inc) => inc.id === Number(id)) || history[0];
}

// Helper to update local history
function saveMockIncident(incident) {
  try {
    const stored = localStorage.getItem('aegis_incident_history');
    let history = stored ? JSON.parse(stored) : [];
    history.unshift(incident);
    localStorage.setItem('aegis_incident_history', JSON.stringify(history.slice(0, 15)));
  } catch (e) {}
}
