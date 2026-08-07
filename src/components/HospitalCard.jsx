import React from 'react';
import { Navigation, Phone, MapPin } from 'lucide-react';

export default function HospitalCard({ hospital }) {
  if (!hospital) return null;

  const {
    name = "Central Emergency Hospital",
    distance = "1.2 miles",
    eta = "4 mins",
    address = "104 Healthcare Blvd",
    phone = "911-0192",
    lat = 37.7749,
    lng = -122.4194
  } = hospital;

  const openNavigation = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="hospital-card">
      <div className="hospital-header">
        <span className="hospital-name">{name}</span>
        <span className="hospital-badge">ETA: {eta}</span>
      </div>
      <div className="hospital-meta">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <MapPin size={14} color="var(--primary-red)" />
          {distance} • {address}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', flex: 1 }} onClick={() => window.open(`tel:${phone}`)}>
          <Phone size={14} /> Call
        </button>
        <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', flex: 1 }} onClick={openNavigation}>
          <Navigation size={14} /> Navigate
        </button>
      </div>
    </div>
  );
}
