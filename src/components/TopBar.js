import labLogoHover from './lab-logo-black.png'
import labLogo from './lab-logo-white.png'
import { Link } from 'react-router-dom';
import './TopBar.css';
import React, { useState } from 'react'
const TopBar = ({children}) => {
    const [isHovered, setIsHovered] = useState(false);
    return ( 
            <nav className="nav-bar">
                <ul className="nav-links">
                    <li>
                        <Link to="/" style={{padding: '0', margin: '0'}}>
                            <img src={isHovered ? labLogoHover : labLogo} alt="EIL" className="lab-logo" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}/>
                        </Link>
                    </li>
                    {children}
                </ul>
            </nav>
     );
}
 
export default TopBar;