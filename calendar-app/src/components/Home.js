import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Welcome to ProCalendar</h1>
    <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
      ProCalendar is your ultimate scheduling solution. Manage your time efficiently, track your events, and stay organized.
    </p>

    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
      <div style={infoBoxStyle}>
        <h3>Track Events</h3>
        <p>Stay on top of your schedule with our intuitive event tracking tools.</p>
      </div>
      <div style={infoBoxStyle}>
        <h3>Easy Integration</h3>
        <p>Sync with your favorite apps and keep everything in one place.</p>
      </div>
      <div style={infoBoxStyle}>
        <h3>Boost Productivity</h3>
        <p>Streamline your workflow and focus on what matters most.</p>
      </div>
    </div>

    <Link to="/calendar" style={{ ...buttonStyle, fontSize: '16px' }}>
      Go to Calendar
    </Link>
  </div>
);

// Reusable styles
const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  textDecoration: 'none',
  fontSize: '14px',
  cursor: 'pointer',
};

const infoBoxStyle = {
  backgroundColor: '#f5f5f5',
  padding: '20px',
  borderRadius: '8px',
  width: '200px',
  textAlign: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

export default Home;
