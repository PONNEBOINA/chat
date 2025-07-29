import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ChatBox from './ChatBox';
import './PrivateChat.css';

const socket = io('http://localhost:5000', {
  query: {
    userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : ''
  }
});

function PrivateChat({ currentUser }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [allMessages, setAllMessages] = useState({});
  const [users, setUsers] = useState([]);

  


  
  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }

  
    socket.on('newPrivateMessage', (message) => {
      const senderId = message.sender._id;
      const receiverId = message.receiver._id || message.receiver;

      const otherUserId = currentUser.id === senderId ? receiverId : senderId;

      setAllMessages(prev => ({
        ...prev,
        [otherUserId]: [...(prev[otherUserId] || []), message]
      }));
    });

    return () => {
      socket.off('newPrivateMessage');
    };
  }, [currentUser.id, users.length]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/users');
      const data = await res.json();
      const filtered = data.filter(u => u._id !== currentUser.id);
      setUsers(filtered);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchPrivateMessages = async (receiverId) => {
    const token = localStorage.getItem('token');
    console.log(token)
    try {
      const res = await fetch(`http://localhost:5000/api/chat/private/${receiverId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAllMessages(prev => ({
        ...prev,
        [receiverId]: data
      }));
    } catch (err) {
      console.error('Failed to fetch private messages:', err.message);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (!allMessages[user._id]) fetchPrivateMessages(user._id);
  };

  const handleSend = (text) => {
    if (!selectedUser) return;

    const message = {
      senderId: currentUser.id,
      receiverId: selectedUser._id,
      content: text
    };

    socket.emit('sendPrivateMessage', message);

    
    setAllMessages(prev => ({
      ...prev,
      [selectedUser._id]: [
        ...(prev[selectedUser._id] || []),
        {
          ...message,
          sender: { _id: currentUser.id, username: currentUser.username },
          receiver: selectedUser._id
        }
      ]
    }));
  };

  return (
    <div className="private-chat-container">
      <div className="user-list">
        <h3>Users</h3>
        <ul>
          {users.map(u => (
            <li
              key={u._id}
              onClick={() => handleUserSelect(u)}
              className={selectedUser?._id === u._id ? 'selected' : ''}
            >
              {u.username}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-area">
        {selectedUser ? (
          <ChatBox
            messages={allMessages[selectedUser._id] || []}
            onSend={handleSend}
            currentUser={currentUser}
          />
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
}

export default PrivateChat;
