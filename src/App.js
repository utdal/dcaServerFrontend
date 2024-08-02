import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoevolvingPairs from './pages/CoevolvingPairs';
import LDL from './pages/LDL';
import Introvid from './pages/Introvid';
import Bioguide from './pages/Bioguide';
import CoevolvingPairsResults from './pages/CoevolvingPairsResults';
import Tile from './components/Tile';
import HomeButton from './components/HomeButton';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/coevolving-pairs" element={<CoevolvingPairs />} />
          <Route path="/coevolving-pairs-results" element={<CoevolvingPairsResults />} />
          <Route path="/LDL" element={<LDL />} />
          <Route path="/introductory-video" element={<Introvid />} />
          <Route path="/guide-for-biologists" element={<Bioguide />} />
          <Route
            path="/"
            element={
              <>
                <header
                  style={{
                    backgroundColor: '#282c34',
                    color: 'white',
                    padding: '20px',
                    textAlign: 'center',
                    minHeight: '100px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <HomeButton />
                  <h1 style={{ flex: 1, textAlign: 'center', margin: 0 }}>DCA Server</h1>
                </header>
                <main style={{ paddingBottom: '100px' }}>
                  <section className="web-servers">
                    <h2>DCA Tools</h2>
                    <hr />
                    <div className="server-cards">
                      <Tile
                        link="/coevolving-pairs"
                        image="path/to/your/image1.jpg"
                        title="Run MSA"
                        description="Multiple Sequence Alignment for Relationship Investigation"
                      />
                      <Tile
                        link="/coevolving-pairs-results"
                        image="path/to/your/image2.jpg"
                        title="DCA Results"
                        description="See the Results of Your DCA Here"
                      />
                      <Tile
                        link="/LDL"
                        image="path/to/your/image3.jpg"
                        title="Latent Generative Landscape"
                        description="Models complex dependencies in an MSA by mapping high-dimensional structures to interpretable forms"
                      />
                    </div>
                  </section>

                  <section className="web-servers">
                    <h2>Tutorials</h2>
                    <hr />
                    <div className="server-cards">
                      <Tile
                        link="/introductory-video"
                        image="path/to/your/image4.jpg"
                        title="Introductory video"
                        description="Watch our introductory video"
                      />
                      <Tile
                        link="/guide-for-biologists"
                        image="path/to/your/image5.jpg"
                        title="Guide for Biologists"
                        description="Comprehensive guide for biologists"
                      />
                    </div>
                  </section>
                </main>

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

                <footer>
                  <div className="footer-left">
                    <p>Designed by Morcos Lab</p>
                  </div>
                  <div className="footer-right">
                    <a href="mailto:insert@gmail.com">
                      <i className="fas fa-envelope"></i> insert@gmail.com
                    </a>
                    <a href="https://morcoslaboratory.org/" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-info-circle"></i> More Information
                    </a>
                  </div>
                </footer>
              </>
            }
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


//Ideas: reformat to look like eliksr, add options for MSA or DI generation, create template MSA results page, create 404 page, think about IDs?   
