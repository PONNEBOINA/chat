import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const LoginPage = () => {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Both fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Invalid credentials");
        return;
      }

      
    localStorage.setItem("user", JSON.stringify(data.user));
localStorage.setItem("token", data.token);
localStorage.setItem("userId", data.user.id);  
localStorage.setItem("isOnline", "true");       
localStorage.setItem("email", data.user.email);  



      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-container">
      <form onSubmit={handleLogin} className="login-form-container">
        <h1>Login Page</h1>

        <label htmlFor="email">Email*</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password*</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button" type="submit">Login</button>

        <p>
          Don't have an account?{" "}
          <span className="span">
            <Link to="/register">Signup</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
