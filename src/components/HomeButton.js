import React from 'react';
import { Link } from 'react-router-dom';
import './HomeButton.css';
import utdLogo from './home-logo.png';

const HomeButton = () => {
  return (
    <Link to="/" className="home-button">
      <img src={utdLogo} alt="UTD Logo" className="home-logo" />
    </Link>
  );
};

export default HomeButton;
