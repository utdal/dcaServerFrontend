import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFlask, faTasks, faVideo, faBook } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); 

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '◁' : '▷'}
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> {isOpen && <span>Home</span>}
            </Link>
          </li>
          <li>
            <Link to="/coevolving-pairs">
              <FontAwesomeIcon icon={faFlask} /> {isOpen && <span>MSA-DCA</span>}
            </Link>
          </li>
          <li>
            <Link to="/dca-task-list">
              <FontAwesomeIcon icon={faTasks} /> {isOpen && <span>DCA Results</span>}
            </Link>
          </li>
          <li>
            <Link to="/LGL">
              <FontAwesomeIcon icon={faFlask} /> {isOpen && <span>LGL</span>}
            </Link>
          </li>
          <li>
            <Link to="/introductory-video">
              <FontAwesomeIcon icon={faVideo} /> {isOpen && <span>Intro Video</span>}
            </Link>
          </li>
          <li>
            <Link to="/guide-for-biologists">
              <FontAwesomeIcon icon={faBook} /> {isOpen && <span>Bio Guide</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
