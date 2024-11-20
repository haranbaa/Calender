import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to the Calendar App</h1>
    <Link to="/calendar">Go to Calendar</Link>
  </div>
);

export default Home;
