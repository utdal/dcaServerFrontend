import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoevolvingPairs from './pages/CoevolvingPairs';
import LGL from './pages/LGL';
import SEEC from './pages/SEEC';
import SEECResults from './pages/SEECResults';
import Introvid from './pages/Introvid';
import Bioguide from './pages/Bioguide';
import CoevolvingPairsResults from './pages/CoevolvingPairsResults';
import CoevolvingPairsThumbnail from './pages/CoevolvingPairsThumbnailV2.png';
import elihksirLogo from './pages/elihksirLogo.png';
import eli from './pages/CoevolvingPairsThumbnailV2.png';
import prosspecLogo from './pages/ProSSpeC_logo.png';
import dcascapesLogo from './pages/dcascapesLogo.png';
import seecLogo from './pages/SEEC-SF-Long.png';
import molegulegoLogo from './pages/moleculego.png';
import githibLogo from './pages/github-mark.png';
import nsfLogo from './pages/nsfLogo.webp';
import LGLThumbnail from './pages/LGLThumbnail.png';
import DCATaskList from './pages/DCATaskList';
import LoadingPage from './pages/LoadingPage';
import Tile from './components/Tile';
import ResultsPage from './pages/ResultsPage';
import HomeButton from './components/HomeButton';
import ViewTasks from './pages/ViewTasks';
import UTDLogo from './pages/UTDLogo.png';
import ApiTest from './backend/ApiTest';
import TopBar from './components/TopBar';
import ToggleBox from './components/ToggleBox';
import './App.css';

import { Link } from 'react-router-dom';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/coevolving-pairs" element={<CoevolvingPairs />} />
          <Route path="/coevolving-pairs-results" element={<CoevolvingPairsResults />} />
          <Route path='/LGL' element={<LGL />} />
          <Route path='/seec' element={<SEEC />} />
          <Route path='/seec-results' element={<SEECResults/>}/>
          <Route path="/introductory-video" element={<Introvid />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/guide-for-biologists" element={<Bioguide />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/dca-task-list" element={<DCATaskList />} />
          <Route path="/tasks" element={<ViewTasks />} />
          <Route path="/test" element={<ApiTest />} />
          <Route path="/" element={
          <>
            <div>
            <TopBar>
              <li><a href="https://morcoslaboratory.org/">Morcos Lab</a></li>
              <li><a href="https://morcoslaboratory.org/?page_id=38">Research</a></li>
              <li><a href="https://morcoslaboratory.org/?page_id=53">Publications</a></li>
              <li><a href="https://morcoslaboratory.org/?page_id=66">People</a></li>
            </TopBar>
            <header className='app-header container'>
              <div className='grid-title'>
                <Link to='/'>
                  <h1>Coevolutionary</h1>
                </Link>
              </div>
              <div className='grid-buttons'>
                <ToggleBox >
                  <Link to="/guide-for-biologists" className="hover-menu-link">
                    Guide
                  </Link>
                  <Link to="/tasks" className="hover-menu-link">
                    Recent Jobs
                  </Link>
                  <Link to='/results' className="hover-menu-link">
                    Results
                  </Link>
                  <Link href="/supporters" className="hover-menu-link">
                    Supporters
                  </Link>
                </ToggleBox>
              </div>
            </header>
            </div>
            <main>
              <section className="web-servers">
                <h2>Tools</h2>
                <hr />
                <div className="server-cards" style={{marginTop: '30px'}}>
                  <Tile
                    toolName="Coevolving Pairs"
                    description="Estimates possible protein structure using pairs of amino acids that tend to evolve together"
                    link="/coevolving-pairs"
                    imageSrc={CoevolvingPairsThumbnail}
                  />
                  <Tile
                    toolName="Latent Generative Landscape"
                    description={<>Models complex dependencies in a sequence alignment by mapping high-dimensional structures to interpretable forms<br /><br /><i>Comming Soon!</i></>}
                    link="#"
                    imageSrc={LGLThumbnail}
                  />
                  <Tile
                    toolName="ProSSpeC"
                    description={<>ProSSpeC: Protease (NIa) Substrate Specificity Calculator<br/><br/><i>Comming Soon!</i></>}
                    link="#"
                    imageSrc={prosspecLogo}
                  />
                  <Tile
                    toolName="Sequence Evolution with Epistatic Contributions"
                    description={<>SEEC<br/><br/><i>Comming Soon!</i></>}
                    link="/seec"
                    imageSrc={seecLogo}      
                  />
                </div>
              </section>

              <section className='web-servers'>
                <h2>Related Projects</h2>
                <hr />
                <div className='server-cards'>
                  <Tile
                    toolName="ELIHKSIR"
                    description="Evolutionary Links Inferred for Histidine Kinase Sensors Interacting with Response regulators"
                    link="https://elihksir.org/"
                    imageSrc={elihksirLogo}
                  />
                  <Tile
                    toolName="DCA Scapes"
                    description="DNA recognition preference of Transcription factors through co-evolutionary modeling"
                    link="https://dcascapes.org/"
                    imageSrc={dcascapesLogo}
                  />
                  <Tile
                    toolName="Molecule Go"
                    description="MoleculeGo is an Educational Gaming App that lets you catch, build, and learn about molecules in the world around you!"
                    link="https://moleculego.com/"
                    imageSrc={molegulegoLogo}
                  />
                </div>
              </section>

              {/* New Source Code Section */}
              <section className="web-servers">
                <h2>Source Code</h2>
                <hr />
                <div className="server-cards">
                  <Tile
                    toolName="MfDCA Source Code"
                    description="View on GitHub"
                    link="https://github.com/utdal/py-mfdca"
                    imageSrc={githibLogo}
                  />
                  <Tile
                    toolName="SEEC Source Code"
                    description="View on GitHub"
                    link="https://github.com/utdal/seec-nt"
                    imageSrc={githibLogo}
                  />
                </div>
              </section>
            </main>
            <footer>
              <div className="footer-left">
                <a href="https://morcoslaboratory.org/" target="_blank">
                  Designed by the Evolutionary Information Lab
                </a>
              </div>
              {/* <div className="footer-right">
                <a href="mailto:insert@gmail.com">
                  <i className="fas fa-envelope"></i> insert@gmail.com
                </a>
                <a href="https://morcoslaboratory.org/" target="_blank">
                  <i className="fas fa-info-circle"></i> About the Lab
                </a>
                <a href="https://www.moleculego.com/" target="_blank">
                  MoleculeGo
                </a>
              </div> */}
              <div className="footer-logo">
                <a href="https://www.utdallas.edu/" target="_blank">
                  <img src={UTDLogo} alt="UTD Logo" className="utd-logo" />
                </a>
                <a href="https://nsf.gov/" target="_blank">
                  <img src={nsfLogo} alt="NSF Logo" className="nsf-logo" style={{ width: '80px', paddingLeft: '20px' }} />
                </a>
              </div>
            </footer>
          </>
          }/>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
