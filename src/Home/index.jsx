// src/components/Home.js
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import PublicContent from "../PublicContent";
import PrivateContent from "../PrivateContent";
import "./index.css";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("public");
  const [user, setUser] = useState(() => {
    // Immediately get user from localStorage during first render
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const renderContent = () => {
    if (selectedTab === "public") {
      return <PublicContent currentUser={user} />;
    }
    if (selectedTab === "private") {
      return <PrivateContent currentUser={user} />;
    }
    return null;
  };

  if (!user) {
    return (
      <div className="unauthorized">
        <h2>User not logged in</h2>
        <p>Please <a href="/">Login</a> to continue.</p>
      </div>
    );
  }

  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="home-container">
        {/* Left panel */}
        <div className="left-panel">
          <div className="user-info">
            <div className="user-avatar">
              {user.username?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <h3>{user.username}</h3>
              <span className="user-status online">Online</span>
            </div>
          </div>

          <div className="tab-buttons">
            <button
              className={`chat-button ${selectedTab === "public" ? "active" : ""}`}
              onClick={() => setSelectedTab("public")}
            >
              🌐 Public Chat
            </button>
            <button
              className={`chat-button ${selectedTab === "private" ? "active" : ""}`}
              onClick={() => setSelectedTab("private")}
            >
              💬 Private Chat
            </button>
          </div>

          <div className="tab-info">
            {selectedTab === "public" ? (
              <div className="info-card">
                <h4>Public Chat</h4>
                <p>Group conversation visible to all users.</p>
              </div>
            ) : (
              <div className="info-card">
                <h4>Private Chat</h4>
                <p>Start a private one-on-one conversation.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="right-panel">
          <div className="content-header">
            <h2>{selectedTab === "public" ? "Public Chat Room" : "Private Messages"}</h2>
          </div>
          <div className="content-body">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
