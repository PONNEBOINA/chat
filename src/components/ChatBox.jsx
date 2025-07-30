import React, { useState } from 'react';
import socket from './socket';
import './ChatBox.css';

function ChatBox({ messages, currentUser, onNewMessage }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: currentUser._id,
      content: newMessage,
    };

    socket.emit('publicMessage', messageData);
    setNewMessage('');
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={msg.sender?._id === currentUser._id ? 'my-message' : 'other-message'}
          >
            <strong>{msg.sender?.username || 'Unknown'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;