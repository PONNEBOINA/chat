import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
     localStorage.setItem('token', userData.token);
    setPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  return (
    <>
      {page === 'login' && <Login onLogin={handleLogin} goToRegister={() => setPage('register')} />}
      {page === 'register' && <Register goToLogin={() => setPage('login')} />}
      {page === 'home' && <Home user={user} onLogout={handleLogout} />}
    </>
  );
}

export default App;
