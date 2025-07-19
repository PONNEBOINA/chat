// ChatRoom.js
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./index.css";

const socket = io("http://localhost:5000");

const ChatRoom = ({ currentUserId, chatWith, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!chatWith) return;

    fetch(`http://localhost:5000/api/users/messages/${chatWith._id}`)
      .then((res) => res.json())
      .then(setMessages)
      .catch(console.error);

    socket.on("privateMessage", (msg) => {
      const isMatch =
        (msg.sender === currentUserId && msg.receiver === chatWith._id) ||
        (msg.sender === chatWith._id && msg.receiver === currentUserId);

      if (isMatch) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("privateMessage");
    };
  }, [chatWith]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendPrivateMessage", {
      sender: currentUserId,
      receiver: chatWith._id,
      text,
    });
    setText("");
  };

  return (
    <div className="chat-room">
      <h3>Chat with {chatWith.username}</h3>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message-bubble ${msg.sender === currentUserId ? "own" : "other"}`}
          >
            <p>{msg.text}</p>
            <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={onClose} style={{ marginLeft: "10px" }}>Close</button>
      </div>
    </div>
  );
};

export default ChatRoom;
