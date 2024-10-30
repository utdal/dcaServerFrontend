import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoevolvingPairs from './pages/CoevolvingPairs';
import LDL from './pages/LDL';
import Introvid from './pages/Introvid';
import Bioguide from './pages/Bioguide';
import CoevolvingPairsResults from './pages/CoevolvingPairsResults';
import CoevolvingPairsThumbnail from './pages/CoevolvingPairsThumbnailV2.png';
import LGLThumbnail from './pages/LGLThumbnail.png';
import DCATaskList from './pages/DCATaskList';
import LoadingPage from './pages/LoadingPage';
import Tile from './components/Tile';
import ResultsPage from './pages/ResultsPage';
import HomeButton from './components/HomeButton';
import ViewTasks from './pages/ViewTasks';
import UTDLogo from './pages/UTDLogo.png';
import ApiTest from './backend/ApiTest';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/coevolving-pairs" element={<CoevolvingPairs />} />
          <Route path="/coevolving-pairs-results" element={<CoevolvingPairsResults />} />
          <Route path='/LDL' element={<LDL />} />
          <Route path="/introductory-video" element={<Introvid />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/guide-for-biologists" element={<Bioguide />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/dca-task-list" element={<DCATaskList />} />
          <Route path="/tasks" element={<ViewTasks />} />
          <Route path="/test" element={<ApiTest />} />
          <Route 
            path="/" 
            element={
              <>
                <header 
                  style={{ 
                    backgroundColor: '#E5EEFC', 
                    color: 'black', 
                    padding: '20px', 
                    textAlign: 'center', 
                    minHeight: '100px', 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}
                >
                  <HomeButton />
                  <h1 style={{ flex: 1, textAlign: 'center', margin: 0 }}>DCA Server</h1>
                  <a href="/guide-for-biologists" className="header-button" style={{ marginLeft: '10px' }}>
                    Guide
                  </a>
                  <a href="/introductory-video" className="header-button" style={{ marginLeft: '10px' }}>
                    Intro Video
                  </a>
                </header>
                <main style={{ paddingBottom: '100px' }}>
                  <section className="web-servers">
                    <h2>DCA Tools</h2>
                    <hr />
                    <div className="server-cards">
                    <Tile
  link="/coevolving-pairs"
  image={CoevolvingPairsThumbnail}
  title="Coevolving Pairs"
  description="Estimates possible protein structure using pairs of amino acids that tend to evolve together"
/>
                      <Tile
                        link="/LDL"
                        image={LGLThumbnail}
                        title="Latent Generative Landscape"
                        description="Models complex dependencies in an MSA by mapping high-dimensional structures to interpretable forms"
                      />
                    </div>
                  </section>

                  {/* New Source Code Section */}
                  <section className="web-servers">
                    <h2>Source Code</h2>
                    <hr />
                    <div className="server-cards">
                      <Tile
                        link="https://github.com/utdal/py-mfdca"
                        image="path/to/github-logo.jpg"
                        title="MfDCA Source Code"
                        description="View on GitHub"
                      />
                      <Tile
                        link="https://github.com/utdal/seec-nt"
                        image="path/to/github-logo.jpg"
                        title="SEEC Source Code"
                        description="View on GitHub"
                      />
                    </div>
                  </section>
                </main>

                <footer>
                  <div className="footer-left">
                    <p>Designed by Morcos Lab</p>
                  </div>
                  <div className="footer-right">
                    <a href="mailto:insert@gmail.com">
                      <i className="fas fa-envelope"></i> insert@gmail.com
                    </a>
                    <a href="https://morcoslaboratory.org/" target="_blank">
                      <i className="fas fa-info-circle"></i> About the Lab
                    </a>
                    <a href="https://www.moleculego.com/" target="_blank">
                      MoleculeGo
                    </a>
                  </div>
                  <div className="footer-logo">
                    <a href="https://www.utdallas.edu/" target="_blank">
                      <img src={UTDLogo} alt="UTD Logo" className="utd-logo" />
                    </a>
                  </div>
                </footer>
              </>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
