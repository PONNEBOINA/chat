import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";

const Navbar = () => {
  const [userData, setUserData] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedIsOnline = localStorage.getItem("isOnline") === "true";

    setUserData(storedUsername || "");
    setIsOnline(storedIsOnline);
  }, []);

  const handleLogout = async () => {
  const userId = localStorage.getItem("userId");

  try {
    const res = await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.error || "Unknown error");

    localStorage.clear();
    alert("Logged out successfully");
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout failed:", err.message);
    alert("Logout failed: " + err.message);
  }
};


  return (
    <div className="nav-container">
      <h1 style={{ color: "white", fontSize: "25px" }}>Chat Application</h1>

      {userData ? (
        <strong style={{ color: "yellow", fontSize: "30px" }}>
          {userData} {isOnline && <span>(Online)</span>}
        </strong>
      ) : (
        <p>Please login</p>
      )}

      <button className="logoutbtn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
