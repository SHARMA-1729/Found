import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Lost from './pages/Lost';
import Found from './pages/Found';
import DashboardPage from './pages/DashboardPage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile'; // Confirm this import

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/found" element={<Found />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} /> {/* Confirm this line */}
        {/* <Route path="/found-status" component={FoundStatus} /> */}
      </Routes>
    </Router>
  );
}

export default App;