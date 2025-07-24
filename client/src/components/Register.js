import React, { useState } from 'react';
import axios from 'axios';
import '../components.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('parent');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { email, password, name, phone, role });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="parent">Parent</option>
          <option value="finder">Finder</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;