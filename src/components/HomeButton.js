import React from 'react';
import { Link } from 'react-router-dom';
import './HomeButton.css';
import labLogo from './lab-logo-black.png';

const HomeButton = () => {
  return (
    <Link to="/" className="home-button">
      <img src={labLogo} alt="Evolutionary Information Laboratory" className="home-logo" />
    </Link>
  );
};

export default HomeButton;
