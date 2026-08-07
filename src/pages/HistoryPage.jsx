import React, { useState, useEffect } from 'react';
import { Clock, Filter, X, ShieldAlert } from 'lucide-react';
import IncidentCard from '../components/IncidentCard';
import StatusBadge from '../components/StatusBadge';
import { getIncidentHistory, getSessionId } from '../services/api';

export default function HistoryPage() {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  useEffect(() => {
    async function fetchHistory() {
      const data = await getIncidentHistory(getSessionId());
      setIncidents(data || []);
    }
    fetchHistory();
  }, []);

  const filteredIncidents = incidents.filter((inc) => {
    if (filterSeverity === 'ALL') return true;
    return (inc.severity || 'MEDIUM').toUpperCase() === filterSeverity;
  });

  return (
    <div className="history-container">
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Incident History</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Log of recorded emergency incidents for Session ID: {getSessionId()}</p>
        </div>

        {/* Severity Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
            <button
              key={sev}
              className="btn-secondary"
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.8rem',
                background: filterSeverity === sev ? 'var(--primary-red)' : 'transparent',
                borderColor: filterSeverity === sev ? 'var(--primary-red)' : 'transparent',
                color: filterSeverity === sev ? '#FFF' : 'var(--text-muted)'
              }}
              onClick={() => setFilterSeverity(sev)}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {filteredIncidents.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Clock size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No incidents recorded for this filter.</h3>
        </div>
      ) : (
        <div className="incident-grid">
          {filteredIncidents.map((inc) => (
            <IncidentCard key={inc.id} incident={inc} onViewDetails={(i) => setSelectedIncident(i)} />
          ))}
        </div>
      )}

      {/* Incident Details Modal */}
      {selectedIncident && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: '1rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '550px', padding: '1.5rem', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={20} color="var(--primary-red)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Incident #{selectedIncident.id}</h3>
              </div>
              <button
                className="btn-secondary"
                style={{ width: '32px', height: '32px', padding: 0 }}
                onClick={() => setSelectedIncident(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Emergency Type:</span>
                <strong style={{ color: '#FFF' }}>{selectedIncident.emergency_type}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Severity Level:</span>
                <StatusBadge severity={selectedIncident.severity} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                <span style={{ color: '#60A5FA', fontWeight: '600' }}>{selectedIncident.status}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Logged Timestamp:</span>
                <span>{selectedIncident.timestamp}</span>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Incident Summary:</span>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.75rem', borderRadius: '6px', color: 'var(--text-main)' }}>
                  {selectedIncident.summary}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button className="btn-primary" onClick={() => setSelectedIncident(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
