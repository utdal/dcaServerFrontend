import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFlask, faTasks, faVideo, faBook } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '◁' : '▷'}
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> {isOpen && 'Home'}
            </Link>
          </li>
          <li>
            <Link to="/coevolving-pairs">
              <FontAwesomeIcon icon={faFlask} /> {isOpen && 'MSA-DCA'}
            </Link>
          </li>
          <li>
            <Link to="/dca-task-list">
              <FontAwesomeIcon icon={faTasks} /> {isOpen && 'DCA Results'}
            </Link>
          </li>
          <li>
            <Link to="/LDL">
              <FontAwesomeIcon icon={faFlask} /> {isOpen && 'LDL'}
            </Link>
          </li>
          <li>
            <Link to="/introductory-video">
              <FontAwesomeIcon icon={faVideo} /> {isOpen && 'Intro Video'}
            </Link>
          </li>
          <li>
            <Link to="/guide-for-biologists">
              <FontAwesomeIcon icon={faBook} /> {isOpen && 'Bio Guide'}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
