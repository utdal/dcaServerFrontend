import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoevolvingPairs from './pages/CoevolvingPairs';
import LGL from './pages/LGL';
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
import './App.css';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/coevolving-pairs" element={<CoevolvingPairs />} />
          <Route path="/coevolving-pairs-results" element={<CoevolvingPairsResults />} />
          <Route path='/LGL' element={<LGL />} />
          <Route path="/introductory-video" element={<Introvid />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/guide-for-biologists" element={<Bioguide />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/dca-task-list" element={<DCATaskList />} />
          <Route path="/tasks" element={<ViewTasks />} />
          <Route path="/test" element={<ApiTest />} />
          <Route path="/prosspec" element={<ProsspecHome />} />
          <Route path="/prosspec/results" element={<MyHeatmap />} />
          <Route
            path="/"
            element={
              <>
                <header
                  style={{
                    backgroundColor: '#E5EEFC',
                    color: 'black',
                    padding: '10px',
                    textAlign: 'center',
                    minHeight: '100px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <HomeButton />
                  <h1 style={{ flex: 1, textAlign: 'center', margin: 0 }}>Coevolutionary.org</h1>
                  <a href="/guide-for-biologists" className="header-button" style={{ marginLeft: '10px' }}>
                    Guide
                  </a>
                  <a href="/tasks" className="header-button" style={{ marginLeft: '10px' }}>
                    Recent Jobs
                  </a>
                </header>
                <main style={{ paddingBottom: '100px' }}>
                  <section className="web-servers">
                    <h2>Coevolutionary Tools</h2>
                    <hr />
                    <div className="server-cards">
                      <Tile
                        link="/coevolving-pairs"
                        image={CoevolvingPairsThumbnail}
                        title="Coevolving Pairs"
                        description="Estimates possible protein structure using pairs of amino acids that tend to evolve together"
                      />
                      <Tile
                        link="#"
                        image={LGLThumbnail}
                        title="Latent Generative Landscape"
                        description={<>Models complex dependencies in a sequence alignment by mapping high-dimensional structures to interpretable forms<br /><br /><i>Comming Soon!</i></>}
                      />
                      <Tile
                        link="/prosspec"
                        image={prosspecLogo}
                        title="ProSSpeC"
                        description={<>ProSSpeC: Protease (NIa) Substrate Specificity Calculator<br/><br/><i>Calculates Hamiltonian Specificity function for Nuclear incision a proteases and potential protein substrates</i></>}
                      />
                      <Tile
                        link="#"
                        image={seecLogo}
                        title="Sequence Evolution with Epistatic Contributions"
                        description={<>SEEC<br/><br/><i>Comming Soon!</i></>}
                      />
                    </div>
                  </section>

                  <section className="web-servers">
                    <h2>Related Projects</h2>
                    <hr />
                    <div className="server-cards">
                      <Tile
                        link="https://elihksir.org/"
                        image={elihksirLogo}
                        title="ELIHKSIR"
                        description="Evolutionary Links Inferred for Histidine Kinase Sensors Interacting with Response regulators"
                      />
                      <Tile
                        link="https://dcascapes.org/"
                        image={dcascapesLogo}
                        title="DCA Scapes"
                        description="DNA recognition preference of Transcription factors through co-evolutionary modeling"
                      />
                      <Tile
                        link="https://moleculego.com/"
                        image={molegulegoLogo}
                        title="Molecule Go"
                        description="MoleculeGo is an Educational Gaming App that lets you catch, build, and learn about molecules in the world around you!"
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
                        image={githibLogo}
                        title="MfDCA Source Code"
                        description="View on GitHub"
                      />
                      <Tile
                        link="https://github.com/utdal/seec-nt"
                        image={githibLogo}
                        title="SEEC Source Code"
                        description="View on GitHub"
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
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
