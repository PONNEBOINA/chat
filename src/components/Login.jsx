import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin, goToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

const handleLogin = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', data);

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLogin(data.user);
    } else {
      setErr(data.error || 'Login failed');
    }
  } catch (err) {
    console.error('Login error:', err);
    setErr('Server error');
  }
};


  return (
    <div className="login-container">
      <h2>Login</h2>
      {err && <p className="error">{err}</p>}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>
        Not registered? <button onClick={goToRegister}>Sign Up</button>
      </p>
    </div>
  );
}

export default Login;
