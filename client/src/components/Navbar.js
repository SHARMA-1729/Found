import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/lost">Report Lost</Link>
      <Link to="/found">Report Found</Link>
      {token && <Link to="/dashboard">Dashboard</Link>}
      {token && <Link to="/profile">Profile</Link>} {/* Added */}
      {!token && <Link to="/login">Login</Link>}
      {!token && <Link to="/register">Register</Link>}
      {token && <button onClick={handleLogout}>Logout</button>}
      
    </nav>
  );
}

export default Navbar;