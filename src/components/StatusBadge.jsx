import React from 'react';

/**
 * Status Badge Component
 * Strict Severity levels: LOW, MEDIUM, HIGH, CRITICAL
 */
export default function StatusBadge({ severity = 'MEDIUM' }) {
  const level = (severity || 'MEDIUM').toUpperCase();
  
  let label = level;
  let className = 'medium';

  if (level === 'LOW') {
    className = 'low';
  } else if (level === 'HIGH') {
    className = 'high';
  } else if (level === 'CRITICAL') {
    className = 'critical';
  }

  return (
    <span className={`status-badge ${className}`}>
      {level === 'CRITICAL' && '⚡ '}
      {label}
    </span>
  );
}
