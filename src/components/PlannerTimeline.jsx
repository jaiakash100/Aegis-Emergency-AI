import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export default function PlannerTimeline({ initialSteps = [] }) {
  const [steps, setSteps] = useState(initialSteps);

  useEffect(() => {
    setSteps(initialSteps);
  }, [initialSteps]);

  const toggleStep = (index) => {
    setSteps((prev) =>
      prev.map((step, i) =>
        i === index ? { ...step, completed: !step.completed } : step
      )
    );
  };

  if (!steps || steps.length === 0) {
    return (
      <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontStyle: 'italic', padding: '0.5rem 0' }}>
        No action steps generated yet. Describe the emergency in chat.
      </div>
    );
  }

  return (
    <div className="timeline-container">
      {steps.map((step, idx) => (
        <div
          key={step.number || idx}
          className={`timeline-step ${step.completed ? 'completed' : ''}`}
          onClick={() => toggleStep(idx)}
          style={{ cursor: 'pointer' }}
        >
          <div className="timeline-step-num">
            {step.completed ? <CheckCircle2 size={16} /> : step.number || idx + 1}
          </div>
          <div className="timeline-step-content">
            <div className="timeline-step-title">{step.title}</div>
            <div className="timeline-step-desc">{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
