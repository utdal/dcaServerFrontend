import React from 'react';
import { Link } from 'react-router-dom';
import './Tile.css';
const Tile = ({ toolName, description, link, imageSrc}) => {
  return (
        <Link to={link} className="tile-link">
      <div className="tile">
        <div className="tile-inner">
          <div className="tile-front tile-structure">
            <div className='tile-structure-image'>
              <img src={imageSrc} alt={toolName} className="tile-image" />
            </div>
            <div className='tile-structure-text'>
              <h3 className="tile-title">{toolName}</h3>
            </div>
          </div>
          <div className="tile-back">
            <p className="tile-description">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );

};

export default Tile;
