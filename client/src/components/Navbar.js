// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../components.css';
// import './Navbar.css'

// function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   const handleLogout = async () => {
//     try {
//       await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     } catch (err) {
//       console.error('Logout error:', err);
//     }
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/">Home</Link>
//       <Link to="/lost">Report Lost</Link>
//       <Link to="/found">Report Found</Link>
//       {token && <Link to="/dashboard">Dashboard</Link>}
//       {token && <Link to="/profile">Profile</Link>} {/* Added */}
//       {!token && <Link to="/login">Login</Link>}
//       {!token && <Link to="/register">Register</Link>}
//       {token && <button onClick={handleLogout}>Logout</button>}
      
//     </nav>
//   );
// }

// export default Navbar;








import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components.css';
import './Navbar.css';
import Logo from '../assets/logo.png'

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
         <img src={Logo} alt="Logo"  style={{height:'30px',width:'60px',transform: 'scale(2.5)',}}/>
        </Link>
      </div>
      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        {token && <Link to="/">Home</Link>}
        {token && <Link to="/lost">Report Lost</Link>}
        {token && <Link to="/found">Report Found</Link>}
        {token && <Link to="/dashboard">Dashboard</Link>}
        {token && <Link to="/profile">Profile</Link>}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        {token && <button onClick={handleLogout} className="logout-btn">Logout</button>}
      </div>
      <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;