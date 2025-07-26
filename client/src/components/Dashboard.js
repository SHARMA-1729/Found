

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode'; // Fixed import
// import '../components.css';

// function Dashboard() {
//   const [reports, setReports] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('No token found, please login');
//           return;
//         }
//         const decoded = jwtDecode(token);
//         const role = decoded.role || 'parent';
//         const url = role === 'parent' ? `${process.env.REACT_APP_API_URL}/lost` : `${process.env.REACT_APP_API_URL}/found`;
//         console.log('Fetching from:', url);
//         const res = await axios.get(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log('Response data:', res.data);
//         const data = Array.isArray(res.data) ? res.data : [res.data];
//         setReports(data);
//         setError(null);
//       } catch (err) {
//         setError(err.response?.status === 404 ? 'No reports found' : err.response?.data?.message || err.message);
//         console.error('Fetch error:', err.response?.data || err.message);
//       }
//     };
//     fetchReports();
//   }, []);

//   return (
//     <div className="dashboard">
//       <h2>Your Reports</h2>
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       {reports.length === 0 && !error && <p>No reports found</p>}
//       {reports.map((report) => (
//         <div key={report._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
//           {report.photo && (
//             <img
//               src={report.photo}
//               alt={`${report.name}'s photo`}
//               style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
//               onError={(e) => console.log('Image load error:', e)}
//             />
//           )}
//           <h3>{typeof report.name === 'string' ? report.name.replace(/"/g, '') : report.name}</h3>
//           {report.approximateAge && <p>Approximate Age: {report.approximateAge}</p>}
//           {report.location && <p>Location: {typeof report.location === 'string' ? report.location.replace(/"/g, '') : report.location}</p>}
//           {report.height && <p>Height: {typeof report.height === 'string' ? report.height.replace(/"/g, '') : report.height}</p>}
//           {report.appearance && <p>Appearance: {report.appearance || 'Not provided'}</p>}
//           {report.age && <p>Age: {report.age}</p>}
//           {report.lastLocation && <p>Last Location: {typeof report.lastLocation === 'string' ? report.lastLocation.replace(/"/g, '') : report.lastLocation}</p>}
//           {report.skinColor && <p>Skin Color: {report.skinColor}</p>}
//           {report.details && <p>Details: {report.details}</p>}
//           {report.submittedByFinder !== undefined && !report.submittedByFinder && (
//             <p>Status: {report.isFound ? 'Found' : 'Not Found'}</p>
//           )}
//           {report.contact && (
//             <div>
//               <h4>Submitted By:</h4>
//               <p>Contact: {report.contact || 'Not provided'}</p>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Dashboard;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import '../components.css';

// function Dashboard() {
//   const [reports, setReports] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('No token found, please login');
//           return;
//         }
//         const decoded = jwtDecode(token);
//         const role = decoded.role || 'parent';
//         const url = role === 'parent' ? `${process.env.REACT_APP_API_URL}/lost` : `${process.env.REACT_APP_API_URL}/found`;
//         console.log('Fetching from:', url);
//         const res = await axios.get(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log('Response data:', res.data);
//         const data = Array.isArray(res.data) ? res.data : [res.data];
//         setReports(data);
//         setError(null);
//       } catch (err) {
//         setError(err.response?.status === 404 ? 'No reports found' : err.response?.data?.message || err.message);
//         console.error('Fetch error:', err.response?.data || err.message);
//       }
//     };
//     fetchReports();
//   }, []);

//   return (
//     <div className="dashboard">
//       <h2>Your Reports</h2>
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       {reports.length === 0 && !error && <p>No reports found</p>}
//       {reports.map((report) => (
//         <div key={report._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
//           {report.photo && (
//             <img
//               src={report.photo}
//               alt={`${report.name}'s photo`}
//               style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
//               onError={(e) => console.log('Image load error:', e)}
//             />
//           )}
//           <h3>{typeof report.name === 'string' ? report.name.replace(/"/g, '') : report.name}</h3>
//           {report.approximateAge && <p>Approximate Age: {report.approximateAge}</p>}
//           {report.location && <p>Location: {typeof report.location === 'string' ? report.location.replace(/"/g, '') : report.location}</p>}
//           {report.height && <p>Height: {typeof report.height === 'string' ? report.height.replace(/"/g, '') : report.height}</p>}
//           {report.appearance && <p>Appearance: {report.appearance || 'Not provided'}</p>}
//           {report.age && <p>Age: {report.age}</p>}
//           {report.lastLocation && <p>Last Location: {typeof report.lastLocation === 'string' ? report.lastLocation.replace(/"/g, '') : report.lastLocation}</p>}
//           {report.skinColor && <p>Skin Color: {report.skinColor}</p>}
//           {report.details && <p>Details: {report.details}</p>}
//           {/* Show isFound status for both roles */}
//           {(report.isFound !== undefined || report.submittedByFinder !== undefined) && (
//             <p>Status: {report.isFound || !report.submittedByFinder ? 'Found' : 'Not Found'}</p>
//           )}
//           {report.contact && (
//             <div>
//               <h4>Submitted By:</h4>
//               <p>Contact: {report.contact || 'Not provided'}</p>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Dashboard;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
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
        const decoded = jwtDecode(token);
        const role = decoded.role || 'parent';
        const url = role === 'parent' ? `${process.env.REACT_APP_API_URL}/lost` : `${process.env.REACT_APP_API_URL}/found`;
        console.log('Fetching from:', url);
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Response data:', res.data);
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setReports(data);
        setError(null);
      } catch (err) {
        setError(err.response?.status === 404 ? 'No reports found' : err.response?.data?.message || err.message);
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
        <div key={report._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          {report.photo && (
            <img
              src={report.photo}
              alt={`${report.name}'s photo`}
              style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
              onError={(e) => console.log('Image load error:', e)}
            />
          )}
          <h3>{typeof report.name === 'string' ? report.name.replace(/"/g, '') : report.name}</h3>
          {report.approximateAge && <p>Approximate Age: {report.approximateAge}</p>}
          {report.location && <p>Location: {typeof report.location === 'string' ? report.location.replace(/"/g, '') : report.location}</p>}
          {report.height && <p>Height: {typeof report.height === 'string' ? report.height.replace(/"/g, '') : report.height}</p>}
          {report.appearance && <p>Appearance: {report.appearance || 'Not provided'}</p>}
          {report.age && <p>Age: {report.age}</p>}
          {report.lastLocation && <p>Last Location: {typeof report.lastLocation === 'string' ? report.lastLocation.replace(/"/g, '') : report.lastLocation}</p>}
          {report.skinColor && <p>Skin Color: {report.skinColor}</p>}
          {report.details && <p>Details: {report.details}</p>}
          {report.isFound !== undefined && (
            <p>Status: {report.isFound ? 'Found' : 'Not Found'}</p>
          )}
          {report.finder && report.isFound && (
            <div>
              <h4>Found By:</h4>
              <p>Name: {report.finder.name || 'Not provided'}</p>
              <p>Phone: {report.finder.phone || 'Not provided'}</p>
            </div>
          )}
          {report.contact && (
            <div>
              <h4>Submitted By:</h4>
              <p>Contact: {report.contact || 'Not provided'}</p>
            </div>
          )}
        </div>
      ))}
      <button onClick={() => window.location.reload()}>Refresh Data</button>
    </div>
  );
}

export default Dashboard;