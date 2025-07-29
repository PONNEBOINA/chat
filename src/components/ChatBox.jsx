// src/ChatBox.js
import React, { useEffect, useRef, useState } from 'react';
import socket from './socket';
import './ChatBox.css';

function ChatBox({ messages, currentUser, onNewMessage }) {
  const chatEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const input = e.target.elements.message;
    const content = input.value.trim();

    if (!content || !currentUser?._id) return;

    const payload = {
      content,
      senderId: currentUser._id,
    };

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/chat/messages/public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const newMsg = await res.json();

      // Emit to others and add to self immediately
      socket.emit('publicMessage', newMsg);
      onNewMessage?.(newMsg);

      input.value = '';
    } catch (err) {
      console.error('Error sending message:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.sender?._id === currentUser._id;
            const sender = isMe ? 'You' : msg.sender?.username || 'Anonymous';

            return (
              <div
                key={msg._id || idx}
                className={`chat-message ${isMe ? 'own-message' : 'other-message'}`}
              >
                <div className="chat-sender">{sender}</div>
                <div className="chat-content">{msg.content}</div>
              </div>
            );
          })
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="chat-input-form">
        <input
          name="message"
          placeholder="Type a message..."
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
