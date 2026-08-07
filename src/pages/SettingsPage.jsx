import React, { useState } from 'react';
import { Server, Users, Save, CheckCircle, Smartphone } from 'lucide-react';
import { getApiConfig, setApiConfig } from '../services/api';

export default function SettingsPage() {
  const currentConfig = getApiConfig();
  const [baseUrl, setBaseUrl] = useState(currentConfig.baseUrl);
  const [mode, setMode] = useState(currentConfig.mode);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Emergency Contacts state
  const [contacts, setContacts] = useState([
    { id: 1, name: "Sarah Connor", phone: "+1 (555) 019-2831", relationship: "Spouse" },
    { id: 2, name: "Dr. Robert Vance", phone: "+1 (555) 441-0982", relationship: "Primary Physician" }
  ]);

  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: 'Family' });

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setApiConfig(baseUrl, mode);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;
    setContacts([...contacts, { ...newContact, id: Date.now() }]);
    setNewContact({ name: '', phone: '', relationship: 'Family' });
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>System & API Configuration</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure backend endpoints and emergency contacts</p>
      </div>

      {/* Backend API Connection Form */}
      <div className="glass-panel settings-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Server size={20} color="var(--primary-red)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Backend Server Contract Endpoint</h3>
        </div>

        <form onSubmit={handleSaveConfig}>
          <div className="form-group">
            <label className="form-label">Operating Engine Mode</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="apiMode"
                  value="MOCK"
                  checked={mode === 'MOCK'}
                  onChange={() => setMode('MOCK')}
                />
                <span><strong>Mock AI Engine</strong> (Zero-setup stand-alone preview)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="apiMode"
                  value="LIVE"
                  checked={mode === 'LIVE'}
                  onChange={() => setMode('LIVE')}
                />
                <span><strong>Live FastAPI Server</strong> (Teammate local / Render deploy)</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">FastAPI Base URL</label>
            <input
              type="text"
              className="form-input"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="e.g. http://localhost:8000 or https://api.render.com"
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem', display: 'block' }}>
              Target endpoints: /chat, /detect, /plan, /hospitals, /history/{'{session_id}'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button type="submit" className="btn-primary">
              <Save size={16} />
              Save Settings
            </button>
            {savedSuccess && (
              <span style={{ color: '#4ADE80', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle size={16} /> Configuration updated successfully!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Emergency Contacts Management */}
      <div className="glass-panel settings-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Users size={20} color="var(--primary-red)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Emergency Contacts</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {contacts.map((c) => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <div style={{ fontWeight: '600', color: '#FFF' }}>{c.name} ({c.relationship})</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.phone}</div>
              </div>
              <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }} onClick={() => setContacts(contacts.filter(item => item.id !== c.id))}>
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add Contact Form */}
        <form onSubmit={handleAddContact} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '0.75rem', alignItems: 'end' }}>
          <div>
            <label className="form-label">Contact Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Full Name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-input"
              placeholder="+1 (555) 000-0000"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">Relationship</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Parent, Doctor"
              value={newContact.relationship}
              onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-secondary" style={{ height: '42px' }}>
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
}
