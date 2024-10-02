import React from 'react';
import { Link } from 'react-router-dom';

const Tile = ({ title, description, link, image }) => {
  return (
    <div className="server-card">
      <Link to={link} className="server-card-link">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div
                className="server-image"
                style={{ backgroundImage: `url(${image})` }}  // Add the image here
              ></div>
              <p>{title}</p>
            </div>
            <div className="flip-card-back">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Tile;
