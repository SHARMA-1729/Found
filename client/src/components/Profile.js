import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Profile fetch error:', err);
      }
    };
    fetchProfile();
  }, []);

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Role:</strong> {user.role === 'parent' ? 'Parent' : 'Finder'}</p>
    </div>
  );
}

export default Profile; // Ensure export