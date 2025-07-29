import React from 'react';
import './Navbar.css';

function Navbar({ username, onLogout }) {
  return (
    <div className="navbar">
      <h2>Chat Application</h2>
      <div className="user-section">
        <span>{username}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
