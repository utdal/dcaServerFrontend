
import React from 'react';
import { Link } from 'react-router-dom';
import './UnifiedTopBar.css';

const UnifiedTopBar = () => {
  return (
    <header className="unified-header">
      <div className="logo-area">
        <Link to="/" className="site-title">Coevolutionary Tools</Link>
      </div>
      <nav className="nav-links-utb">
        <a href="https://morcoslaboratory.org/">Morcos Lab</a>
        <a href="https://morcoslaboratory.org/?page_id=38">Research</a>
        <a href="https://morcoslaboratory.org/?page_id=53">Publications</a>
        <a href="https://morcoslaboratory.org/?page_id=66">People</a>
        <Link to="/guide-for-biologists">Guide</Link>
        <Link to="/tasks">Recent Jobs</Link>
        <Link to="/results">Results</Link>
      </nav>
    </header>
  );
};

export default UnifiedTopBar;
