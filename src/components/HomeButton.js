import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './HomeButton.css';

const HomeButton = () => {
  return (
    <Link to="/" className="home-button">
      <FontAwesomeIcon icon={faHome} />
    </Link>
  );
};

export default HomeButton;
