import React from 'react';
import { useLocation } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
  const location = useLocation();
  const {name} = location.state || {};

  return (
    <div className="homepage-container">
      <h2>Welcome to the Home Page!</h2>
      {name && <p> Logged in as: <h3>{name}</h3></p>}
     
    </div>
  );
};

export default HomePage;
