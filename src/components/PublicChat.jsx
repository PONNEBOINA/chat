// src/PublicChat.js
import React, { useState, useEffect } from 'react';
import socket from './socket';
import ChatBox from './ChatBox';
import './PublicChat.css';

function PublicChat({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  // Fetch all users
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  // Fetch previous public messages
  useEffect(() => {
    fetch('http://localhost:5000/api/chat/messages/public')
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error('Error fetching messages:', err));
  }, []);

  // Register socket events
  useEffect(() => {
    socket.connect();
    socket.emit('register', currentUser._id);

    socket.on('publicMessage', (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      socket.off('publicMessage');
      socket.disconnect();
    };
  }, [currentUser._id]);

  return (
    <div className="private-chat-container">
      <div className="user-list">
        <h3>Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      </div>

      <div className="chat-area">
        <ChatBox
          messages={messages}
          currentUser={currentUser}
          onNewMessage={(msg) => setMessages((prev) => [...prev, msg])}
        />
      </div>
    </div>
  );
}

export default PublicChat;
