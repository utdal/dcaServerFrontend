import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoevolvingPairs from './pages/CoevolvingPairs';
import CoevolvingPairsResults from './pages/CoevolvingPairsResults';
import Tile from './components/Tile';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/coevolving-pairs" element={<CoevolvingPairs />} />
          <Route path="/coevolving-pairs-results" element={<CoevolvingPairsResults />} />
          <Route path="/" element={
            <>
              <header style={{ backgroundColor: '#282c34', color: 'white', padding: '20px', textAlign: 'center', minHeight: '100px' }}>
                <h1>DCA Server</h1>
              </header>
              <main>
                <section className="web-servers">
                  <h2>Web Servers</h2>
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
                  </div>
                </section>
              </main>
              <footer>
                <p>Designed by Nicholas Nguyen</p>
              </footer>
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
