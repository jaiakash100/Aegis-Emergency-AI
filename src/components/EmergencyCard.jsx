import React from 'react';
import StatusBadge from './StatusBadge';
import { AlertTriangle, Activity } from 'lucide-react';

export default function EmergencyCard({ emergency = {} }) {
  const {
    type = "Medical Emergency",
    severity = "CRITICAL",
    confidence = 0.97
  } = emergency;

  const confidencePercent = Math.round(confidence * 100);

  return (
    <div className="glass-panel metric-card">
      <div className="metric-header">
        <span className="metric-title">Emergency Detection</span>
        <AlertTriangle size={20} className="metric-icon" />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)' }}>{type}</span>
          <StatusBadge severity={severity} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <Activity size={15} color="var(--primary-red)" />
          <span>AI Confidence: <strong style={{ color: '#FFF' }}>{confidencePercent}%</strong></span>
        </div>
      </div>
    </div>
  );
}
