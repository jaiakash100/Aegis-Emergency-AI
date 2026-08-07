import React, { useState, useEffect } from 'react';
import { ShieldAlert, Building2, Activity, CheckSquare, MapPin } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import EmergencyCard from '../components/EmergencyCard';
import HospitalCard from '../components/HospitalCard';
import MapContainer from '../components/MapContainer';
import PlannerTimeline from '../components/PlannerTimeline';
import { getHospitals, getPlan } from '../services/api';

export default function DashboardPage({ emergencyState = {} }) {
  const [hospitals, setHospitals] = useState([]);
  const [planSteps, setPlanSteps] = useState([]);

  const {
    severity = 'HIGH',
    actions = [],
    hospitals: initialHospitals = []
  } = emergencyState;

  useEffect(() => {
    async function loadDashboardData() {
      if (initialHospitals.length > 0) {
        setHospitals(initialHospitals);
      } else {
        const res = await getHospitals();
        setHospitals(res.results || []);
      }

      if (actions.length > 0) {
        setPlanSteps(actions);
      } else {
        const p = await getPlan();
        setPlanSteps(p.steps || []);
      }
    }
    loadDashboardData();
  }, [emergencyState]);

  const nearestHospital = hospitals[0] || { name: 'Metro Trauma Center', eta: '4 mins' };
  const currentAction = planSteps.find((s) => !s.completed) || planSteps[0] || { title: 'Monitoring Situation' };

  return (
    <div className="dashboard-container">
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Emergency Command Dashboard</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Real-time telemetry, routing, and action plan management</p>
        </div>
        <StatusBadge severity={severity} />
      </div>

      {/* EXACTLY 4 REQUIRED DASHBOARD CARDS */}
      <div className="dashboard-grid">
        {/* 1. Emergency Level */}
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span className="metric-title">Emergency Level</span>
            <ShieldAlert size={20} className="metric-icon" />
          </div>
          <div>
            <div className="metric-value">
              <StatusBadge severity={severity} />
            </div>
            <div className="metric-subtext">Active Triage Classification</div>
          </div>
        </div>

        {/* 2. Nearest Hospital */}
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span className="metric-title">Nearest Hospital</span>
            <Building2 size={20} style={{ color: '#4ADE80' }} />
          </div>
          <div>
            <div className="metric-value" style={{ fontSize: '1.1rem', lineHeight: '1.3' }}>
              {nearestHospital.name}
            </div>
            <div className="metric-subtext">ETA: <strong style={{ color: '#4ADE80' }}>{nearestHospital.eta}</strong></div>
          </div>
        </div>

        {/* 3. Current Action */}
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span className="metric-title">Current Action</span>
            <Activity size={20} style={{ color: 'var(--status-medium-text)' }} />
          </div>
          <div>
            <div className="metric-value" style={{ fontSize: '1rem', lineHeight: '1.3' }}>
              {currentAction.title}
            </div>
            <div className="metric-subtext">Step #{currentAction.number || 1} in progress</div>
          </div>
        </div>

        {/* 4. Incident Status */}
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span className="metric-title">Incident Status</span>
            <CheckSquare size={20} style={{ color: '#60A5FA' }} />
          </div>
          <div>
            <div className="metric-value" style={{ color: '#60A5FA' }}>
              Active
            </div>
            <div className="metric-subtext">Dispatching Response Unit</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Map & Hospital List / Action Steps */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Map View */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <MapPin size={18} color="var(--primary-red)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Emergency Routing Map</h3>
            </div>
            <MapContainer hospitals={hospitals} />
          </div>

          {/* Action Step Timeline */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Active Response Timeline</h3>
            <PlannerTimeline initialSteps={planSteps} />
          </div>
        </div>

        {/* Hospital Recommendation List */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Nearby Hospitals</h3>
          {hospitals.map((h, i) => (
            <HospitalCard key={h.id || i} hospital={h} />
          ))}
        </div>
      </div>
    </div>
  );
}
