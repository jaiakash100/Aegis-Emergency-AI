import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, AlertCircle, ShieldAlert, Cpu, Building2 } from 'lucide-react';
import { sendChatMessage, getSessionId } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import PlannerTimeline from '../components/PlannerTimeline';
import HospitalCard from '../components/HospitalCard';

export default function ChatPage({ initialPrompt = '', onUpdateEmergencyState }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: '🚨 **AEGIS AI Emergency Triage Active**. Please describe the situation or press SOS. What is happening?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Latest AI response state contract
  const [responseContract, setResponseContract] = useState({
    reply: '',
    reasoning: 'Waiting for emergency report input...',
    severity: 'LOW',
    actions: [],
    hospital_recommendation: [],
    memory_saved: true
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const data = await sendChatMessage(query, getSessionId());
      
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: data.reply || 'Request processed.'
      };

      setMessages((prev) => [...prev, aiMsg]);
      setResponseContract(data);

      if (onUpdateEmergencyState) {
        onUpdateEmergencyState({
          severity: data.severity,
          actions: data.actions,
          hospitals: data.hospital_recommendation,
          lastMessage: query
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: '⚠️ Connection error contacting emergency endpoint.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-layout">
      {/* Main Chat Panel */}
      <div className="glass-panel chat-main-panel">
        <div className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="brand-icon" style={{ width: '32px', height: '32px' }}>
              <ShieldAlert size={18} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Emergency Dispatch Assistant</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Session ID: {getSessionId()}</div>
            </div>
          </div>

          <StatusBadge severity={responseContract.severity} />
        </div>

        {/* Message History */}
        <div className="chat-messages-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
              <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
            </div>
          ))}

          {isLoading && (
            <div className="chat-bubble ai">
              <div className="loading-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                  Evaluating response protocol...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <form
          className="chat-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <button
            type="button"
            className="chat-action-btn sos"
            title="Immediate SOS Alert"
            onClick={() => handleSendMessage("CRITICAL EMERGENCY! Send immediate assistance now.")}
          >
            <ShieldAlert size={20} />
          </button>

          <input
            type="text"
            className="chat-input"
            placeholder="Type your emergency (e.g. 'My father collapsed')..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            type="button"
            className="chat-action-btn"
            title="Voice Input (Placeholder)"
            onClick={() => alert("Voice transcription placeholder active.")}
          >
            <Mic size={20} />
          </button>

          <button type="submit" className="btn-primary" style={{ height: '44px', padding: '0 1.25rem' }}>
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Side Intelligence Panel */}
      <div className="chat-side-panel">
        {/* Reasoning Panel */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--primary-red)', fontWeight: '700', fontSize: '0.9rem' }}>
            <Cpu size={18} />
            <span>AI REASONING LOG</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            {responseContract.reasoning}
          </p>
        </div>

        {/* Action Plan Checklist */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)' }}>ACTION PLAN STEPS</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{responseContract.actions.length} Steps</span>
          </div>
          <PlannerTimeline initialSteps={responseContract.actions} />
        </div>

        {/* Nearest Hospital Card */}
        {responseContract.hospital_recommendation && responseContract.hospital_recommendation.length > 0 && (
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: '700', fontSize: '0.9rem' }}>
              <Building2 size={18} color="#4ADE80" />
              <span>RECOMMENDED HOSPITAL</span>
            </div>
            <HospitalCard hospital={responseContract.hospital_recommendation[0]} />
          </div>
        )}
      </div>
    </div>
  );
}
