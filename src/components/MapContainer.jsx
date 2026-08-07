import React, { useState } from 'react';
import { MapPin, Navigation, Crosshair, Building2 } from 'lucide-react';

export default function MapContainer({ hospitals = [], userLocation = { lat: 37.7749, lng: -122.4194 } }) {
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0] || null);

  return (
    <div className="map-box">
      <div className="map-mock-bg">
        <div className="map-grid-lines"></div>

        {/* User Location Pin */}
        <div className="map-pin user-location" title="Your Emergency Location">
          <div className="pin-icon user">
            <Crosshair size={16} />
          </div>
          <div className="pin-label">Your Location</div>
        </div>

        {/* Hospital Pins */}
        {hospitals.map((h, i) => (
          <div
            key={h.id || i}
            className="map-pin hospital"
            style={{
              top: `${25 + i * 22}%`,
              left: `${55 + (i % 2) * 15}%`
            }}
            onClick={() => setSelectedHospital(h)}
          >
            <div className="pin-icon hosp">
              <Building2 size={15} />
            </div>
            <div className="pin-label">{h.name} ({h.eta})</div>
          </div>
        ))}

        {/* Selected Hospital Info Overlay */}
        {selectedHospital && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            background: 'rgba(18, 18, 22, 0.92)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.65rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 20
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#FFF' }}>{selectedHospital.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedHospital.distance} • ETA: {selectedHospital.eta}</div>
            </div>
            <button
              className="btn-primary"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', gap: '0.25rem' }}
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedHospital.lat},${selectedHospital.lng}`, '_blank')}
            >
              <Navigation size={12} />
              Directions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
