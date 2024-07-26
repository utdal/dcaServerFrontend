import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoevolvingPairs from './pages/CoevolvingPairs';
import LDL from './pages/LDL';
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
          <Route path='/LDL' element={<LDL />} />
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
                <main>
                  <section className="web-servers">
                    <h2>DCA Tools</h2>
                    <hr />
                    <div className="server-cards">
                      <Tile
                        link="/coevolving-pairs"
                        image="path/to/your/image1.jpg"
                        title="EV Coupling"
                        description="EV Coupling Information"
                      />
                      <Tile
                        link="/coevolving-pairs-results"
                        image="path/to/your/image2.jpg"
                        title="EV Complex"
                        description="EV Complex Information"
                      />
                      <Tile
                        link="/LDL"
                        image="path/to/your/image3.jpg"
                        title="Latent Generative Landscape"
                        description="Models complex dependencies in an MSA by mapping high-dimensional structures to interpretable forms"
                      />
                    </div>
                  </section>
                </main>

                {/* Include Font Awesome CDN in your HTML head if not already included */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

                <footer>
                  <div className="footer-left">
                    <p>Designed by Morcos Lab</p>
                  </div>
                  <div className="footer-right">
                    <a href="mailto:insert@gmail.com">
                      <i className="fas fa-envelope"></i> insert@gmail.com
                    </a>
                    <a href="https://morcoslaboratory.org/" target="_blank">
                      <i className="fas fa-info-circle"></i> More Information
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
