import React from 'react';
import StatusBadge from './StatusBadge';
import { Calendar, ChevronRight } from 'lucide-react';

export default function IncidentCard({ incident, onViewDetails }) {
  if (!incident) return null;

  const {
    id,
    emergency_type = "Medical",
    severity = "HIGH",
    status = "Active",
    summary = "Emergency reported",
    timestamp = "Just now"
  } = incident;

  return (
    <div className="glass-panel incident-card">
      <div className="incident-card-header">
        <span className="incident-type">{emergency_type}</span>
        <StatusBadge severity={severity} />
      </div>

      <p className="incident-summary">{summary}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          <Calendar size={14} />
          <span>{timestamp}</span>
        </div>

        <button
          className="btn-secondary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '0.25rem' }}
          onClick={() => onViewDetails(incident)}
        >
          View Details
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
