import React from 'react';

const Tile = ({ title, description, link }) => {
  return (
    <div className="server-card">
      <a href={link} target="_blank" rel="noopener noreferrer" className="server-card-link">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="server-image"></div>
              <p>{title}</p>
            </div>
            <div className="flip-card-back">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Tile;