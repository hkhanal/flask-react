import React from 'react';
import './HomePage.css'; // Import your CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="background-image"></div>
      <div className="content">
        {/* Your content goes here */}
        <h1>Welcome to Our Website</h1>
        <p>This is the description of our awesome website.</p>
      </div>
    </div>
  );
};

export default HomePage;