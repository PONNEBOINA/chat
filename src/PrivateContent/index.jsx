import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatRoom from "../ChatRoom";

const socket = io("http://localhost:5000"); // Fixed port

const PrivateContent = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [chatUser, setChatUser] = useState(null);

  const currentUserId = currentUser?.id || localStorage.getItem("userId");
  const currentUsername = currentUser?.username || localStorage.getItem("username");

  useEffect(() => {
    fetch("http://localhost:5000/api/users/public")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registered Users</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <li
            key={user._id}
            onClick={() => user._id !== currentUserId && setChatUser(user)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px 16px",
              margin: "10px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: user.isOnline ? "#e6ffe6" : "#ffe6e6",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              cursor: user._id !== currentUserId ? "pointer" : "not-allowed",
              opacity: user._id === currentUserId ? 0.6 : 1,
              position: "relative"
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "1.1em" }}>
              {user.username}
              {user.username === currentUsername && " (You)"}
            </span>

            <span
              style={{
                color: user.isOnline ? "green" : "red",
                fontWeight: 500,
              }}
            >
              {user.isOnline ? "Online" : "Offline"}
            </span>
          </li>
        ))}
      </ul>

      {chatUser && (
        <div
          style={{
            marginTop: "30px",
            borderTop: "1px solid #ddd",
            paddingTop: "20px",
          }}
        >
          <ChatRoom
            currentUserId={currentUserId}
            chatWith={chatUser}
            onClose={() => setChatUser(null)}
          />
        </div>
      )}
    </div>
  );
};

export default PrivateContent;
