import React, { useState } from 'react';
import Navbar from './Navbar';
import PublicChat from './PublicChat';
import PrivateChat from './PrivateChat';
import './Home.css';

function Home({ user, onLogout }) {
  const [mode, setMode] = useState('public');

  return (
    <div className="home">
      <Navbar username={user.username} onLogout={onLogout} />
      <div className="mode-buttons">
        <button onClick={() => setMode('public')} className={mode === 'public' ? 'active' : ''}>
          Public Chat
        </button>
        <button onClick={() => setMode('private')} className={mode === 'private' ? 'active' : ''}>
          Private Chat
        </button>
      </div>
      <div className="chat-section">
        {mode === 'public' ? (
          <PublicChat currentUser={user} />
        ) : (
          <PrivateChat currentUser={user} />
        )}
      </div>
    </div>
  );
}

export default Home;
