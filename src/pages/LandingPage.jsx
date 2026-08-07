import React from 'react';
import { ShieldAlert, Zap, Activity, Flame, Car, HeartPulse, ArrowRight } from 'lucide-react';

export default function LandingPage({ onStartEmergency, onTriggerPrompt }) {
  return (
    <div className="landing-container">
      <section className="hero-section">
        <div className="hero-tag">
          <Zap size={15} />
          <span>AEGIS Emergency Intelligence v2.5</span>
        </div>

        <h1 className="hero-title">
          Autonomous AI Emergency <br />
          <span style={{ color: 'var(--primary-red)' }}>Response & Triage System</span>
        </h1>

        <p className="hero-subtitle">
          Instant severity classification, multi-step emergency action planning, and automated hospital routing powered by AI.
        </p>

        <div className="hero-actions">
          <button className="btn-sos" onClick={onStartEmergency}>
            <ShieldAlert size={28} />
            <span>TRIGGER SOS EMERGENCY</span>
          </button>
        </div>
      </section>

      {/* Quick Trigger Cards */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Instant Emergency Triggers
        </h3>

        <div className="quick-prompts-grid">
          <div className="prompt-card" onClick={() => onTriggerPrompt("My father collapsed in the living room and is unresponsive.")}>
            <div className="prompt-card-icon">
              <HeartPulse size={20} />
            </div>
            <div className="prompt-card-title">Medical Collapse</div>
            <div className="prompt-card-desc">"My father collapsed and is unresponsive."</div>
          </div>

          <div className="prompt-card" onClick={() => onTriggerPrompt("Smoke and fire coming from the kitchen electric box.")}>
            <div className="prompt-card-icon">
              <Flame size={20} />
            </div>
            <div className="prompt-card-title">Fire Emergency</div>
            <div className="prompt-card-desc">"Heavy smoke coming from electrical outlet."</div>
          </div>

          <div className="prompt-card" onClick={() => onTriggerPrompt("Car accident at main street intersection, two vehicles involved.")}>
            <div className="prompt-card-icon">
              <Car size={20} />
            </div>
            <div className="prompt-card-title">Traffic Collision</div>
            <div className="prompt-card-desc">"Multi-vehicle crash at intersection."</div>
          </div>

          <div className="prompt-card" onClick={() => onTriggerPrompt("I need immediate medical guidance for severe bleeding.")}>
            <div className="prompt-card-icon">
              <Activity size={20} />
            </div>
            <div className="prompt-card-title">Severe Injury Triage</div>
            <div className="prompt-card-desc">"Immediate triage guidance for hemorrhage."</div>
          </div>
        </div>
      </div>
    </div>
  );
}
