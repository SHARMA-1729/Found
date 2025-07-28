import React from 'react';
import './Home.css';
import Hero from '../assets/hero.png';
import ReportIcon from '../assets/ReportIcon.png';  // add your icons
import MatchIcon from '../assets/MatchIcon.png';
import NotifyIcon from '../assets/NotifyIcon.png';
import LockIcon from '../assets/lock.png';
import Footer from './Footer.js'
import { Link } from 'react-router-dom';
function Home() {

  const token = localStorage.getItem('token');
  return (
    <div>
      <div className="home">
        <div className="box">
          <div className="tex">
            <h1  >Because Every Child Deserves to Be Found.</h1>
           
             {!token && <Link to="/login" className="report-btn">Find My Child</Link>}

          </div>
          <div className="hero">
            <img src={Hero} alt=""  style={{height:'500px',width:'600px',borderRadius:'20px'}}/>
          </div>
        </div>
      </div>

      {/* ✅ How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">
            <img src={ReportIcon} alt="Report" />
            </div>
            <h3>Report</h3>
            <p> Provide details and upload a photo of the missing child to alert the community.</p>
          </div>
          <div className="step">
            <div className="step-icon">
            <img src={MatchIcon} alt="Match" />
            </div>
            <h3>Match</h3>
            <p>Our system compares uploaded photos to identify potential matches quickly.</p>
          </div>
          <div className="step">
            <div className="step-icon">
            <img src={NotifyIcon} alt="Notify" />
            </div>
            <h3>Notify</h3>
            <p>Receurorvcuck and updated of your case</p>
          </div>
        </div>

        <div className="safety-card">
          <div className="safety-icon">
          <img src={LockIcon} alt="Safety" />
          </div>
          <div>
            <h3>Safety First</h3>
            <p>We prioritize the security and privacy of all personal information shared on our platform.</p>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Home;
