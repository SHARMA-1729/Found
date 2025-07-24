import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components.css';

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found, please login');
          return;
        }
        console.log('Token:', token);
        console.log('Fetching from:', `${process.env.REACT_APP_API_URL}/lost`);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/lost`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Response data:', res.data);
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setReports(data);
        setError(null);
      } catch (err) {
        setError(err.response?.status === 404 ? 'No reports found' : err.message);
        console.error('Fetch error:', err.response?.data || err.message);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="dashboard">
      <h2>Your Reports</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {reports.length === 0 && !error && <p>No reports found</p>}
      {reports.map((report) => (
        <div key={report._id} style={{ marginBottom: '20px' }}>
          {report.photo && (
            <img
              src={report.photo}
              alt={`${report.name}'s photo`}
              style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
              onError={(e) => console.log('Image load error:', e)}
            />
          )}
          <h3>{typeof report.name === 'string' ? report.name.replace(/"/g, '') : report.name}</h3>
          <p>Age: {report.age}</p>
          <p>Last Location: {typeof report.lastLocation === 'string' ? report.lastLocation.replace(/"/g, '') : report.lastLocation}</p>
          <p>Height: {typeof report.height === 'string' ? report.height.replace(/"/g, '') : report.height}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;