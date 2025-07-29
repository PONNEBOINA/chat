import React, { useState } from 'react';
import './Register.css';

function Register({ goToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async () => {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('Registration successful!');
      setTimeout(() => goToLogin(), 1500);
    } else {
      setErr(data.error || 'Register failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {err && <p className="error">{err}</p>}
      {msg && <p className="success">{msg}</p>}
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Sign Up</button>
      <p>
        Already have an account? <button onClick={goToLogin}>Login</button>
      </p>
    </div>
  );
}

export default Register;
