import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [activePage, setActivePage] = useState('landing');
  const [initialChatPrompt, setInitialChatPrompt] = useState('');
  const [emergencyState, setEmergencyState] = useState({
    severity: 'HIGH',
    actions: [],
    hospitals: [],
    lastMessage: ''
  });

  const handleStartEmergency = () => {
    setInitialChatPrompt('');
    setActivePage('chat');
  };

  const handleTriggerPrompt = (promptText) => {
    setInitialChatPrompt(promptText);
    setActivePage('chat');
  };

  const handleUpdateEmergencyState = (newState) => {
    setEmergencyState((prev) => ({ ...prev, ...newState }));
  };

  return (
    <div className="app-container">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        {activePage === 'landing' && (
          <LandingPage
            onStartEmergency={handleStartEmergency}
            onTriggerPrompt={handleTriggerPrompt}
          />
        )}

        {activePage === 'chat' && (
          <ChatPage
            initialPrompt={initialChatPrompt}
            onUpdateEmergencyState={handleUpdateEmergencyState}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage emergencyState={emergencyState} />
        )}

        {activePage === 'history' && <HistoryPage />}

        {activePage === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}
