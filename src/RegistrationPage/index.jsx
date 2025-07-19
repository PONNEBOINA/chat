import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";



const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required");
      setEmail("")
      setPassword("")
      setUsername("")
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Registration failed");
        return;
      }

      alert("Registration successful!");
      navigate("/"); 
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-container">
      <form onSubmit={handleRegister} className="login-form-container">
        <h1>Register Page</h1>

        <label htmlFor="username">Username*</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button className="button" type="submit">Register</button>

        <p>
          Already have an account?{" "}
          <span className="span">
            <Link to="/">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
