import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./index.css";

const socket = io("http://localhost:5000"); // Fixed port

const PublicContent = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users/groups/public/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Failed to fetch messages", err));

    socket.on("groupMessage", (message) => {
      if (message.groupId === "public") {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("groupMessage");
    };
  }, []);

  const handleSend = () => {
    if (!text.trim() || !currentUser) return;
    
    socket.emit("sendGroupMessage", {
      sender: currentUser.id,
      groupId: "public",
      text,
    });
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="public-chat-container">
      <h2>Public Chat</h2>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message-bubble ${
              msg.sender._id === currentUser?.id ? "own" : "other"
            }`}
          >
            <strong>{msg.sender.username}</strong>
            <p>{msg.text}</p>
            <div style={{ fontSize: "0.8em", color: "#999" }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default PublicContent;
