import React from 'react';
import { ShieldAlert, Home, MessageSquare, Clock, Settings, Wifi } from 'lucide-react';
import { getApiConfig } from '../services/api';

export default function Navbar({ activePage, setActivePage }) {
  const { mode, baseUrl } = getApiConfig();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); setActivePage('landing'); }}>
          <div className="brand-icon">
            <ShieldAlert size={22} />
          </div>
          <span>AEGIS <span style={{ color: 'var(--primary-red)', fontSize: '0.85em' }}>AI</span></span>
        </a>

        <ul className="nav-links">
          <li>
            <button
              className={`nav-btn ${activePage === 'landing' ? 'active' : ''}`}
              onClick={() => setActivePage('landing')}
            >
              <Home size={17} />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${activePage === 'chat' ? 'active' : ''}`}
              onClick={() => setActivePage('chat')}
            >
              <MessageSquare size={17} />
              <span>Emergency Chat</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${activePage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActivePage('dashboard')}
            >
              <ShieldAlert size={17} />
              <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${activePage === 'history' ? 'active' : ''}`}
              onClick={() => setActivePage('history')}
            >
              <Clock size={17} />
              <span>History</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${activePage === 'settings' ? 'active' : ''}`}
              onClick={() => setActivePage('settings')}
            >
              <Settings size={17} />
              <span>Profile & API</span>
            </button>
          </li>
        </ul>

        <div className="nav-status-indicator" title={`Backend Target: ${baseUrl}`}>
          <div className={`status-dot ${mode === 'MOCK' ? 'mock' : ''}`} />
          <span>{mode === 'LIVE' ? 'FastAPI Connected' : 'Mock Engine Active'}</span>
        </div>
      </div>
    </nav>
  );
}
