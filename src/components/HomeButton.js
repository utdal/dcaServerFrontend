import React from 'react';
import { Link } from 'react-router-dom';
import './HomeButton.css';
import labLogo from './lab-logo-black.png';
import whiteLabLogo from './lab-logo-white.png';

const HomeButton = () => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme:dark)')
  return (
    <Link to="/" className="home-button">
      <img src={!prefersDarkScheme.matches? labLogo: whiteLabLogo} alt="Evolutionary Information Laboratory" className="home-logo" />
    </Link>
  );
};

export default HomeButton;
