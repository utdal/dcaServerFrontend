import React, { useState } from 'react';
import './ToggleBox.css';

function ToggleBox({children}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="hover-menu-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="hamburger-icon">
        &#9776;
      </div>

      {hovered && (
        <div className="hover-menu-dropdown">
          {children}
        </div>
      )}
    </div>
  );
}

export default ToggleBox;