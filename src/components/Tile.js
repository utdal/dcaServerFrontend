import React from 'react';
import { Link } from 'react-router-dom';
import './Tile.css';
const Tile = ({ toolName, description, link, imageSrc }) => {
  const isExternal = link.startsWith('http');
  const innerContent = (
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
  );

  if (isExternal) {
    return (
      <a href={link} className="tile-link" target="_blank" rel="noopener noreferrer">
        {innerContent}
      </a>
    );
  }

  return (
    <Link to={link} className="tile-link">
      {innerContent}
    </Link>
  );

};

export default Tile;
