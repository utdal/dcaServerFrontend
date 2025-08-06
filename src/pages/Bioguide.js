import React from 'react';
import HomeButton from '../components/HomeButton';
import dcaImage from './dca.png';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UTDLogo from './UTDLogo.png';
import UnifiedTopBar from '../components/UnifiedTopBar';
import SEECVideo from '../components/SEECVideo';
import { motion } from 'framer-motion';
import Tabs from '../components/GuideTabs';

const Bioguide = () => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const sectionStyle = {
    backgroundColor: prefersDarkScheme ? '#1e1e1e' : '#f4f8fc',
    borderRadius: '16px',
    padding: '30px',
    margin: '30px auto',
    maxWidth: '900px',
    boxShadow: prefersDarkScheme
      ? '0 10px 25px rgba(255,255,255,0.1)'
      : '0 10px 25px rgba(0,0,0,0.1)',
  };

  const headingStyle = {
    color: '#ff6600',
    fontSize: '28px',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const paragraphStyle = {
    textAlign: 'left',
    lineHeight: '1.8',
    fontSize: '18px',
    color: prefersDarkScheme ? '#e0e0e0' : '#333',
    marginBottom: '20px',
  };

  const imageStyle = {
    width: '100%',
    borderRadius: '12px',
    marginTop: '20px',
  };

  const tabs = [
    {
      title: 'DCA Guide',
      content: (
        <>
          <motion.div
            style={sectionStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 style={headingStyle}>Basics to DCA</h3>
            <p style={paragraphStyle}>
              As organisms evolve, point mutations in genes encoding functional proteins may result in a nonsynonymous codon change. Nonsynonymous codon changes lead to an amino acid residue change in the encoded protein. If the residue is important in the structure and/or function of the protein, then selective pressure is increased upon other residues that stabilize the intramolecular or intermolecular interaction in the wild-type protein(s).
            </p>
          </motion.div>
          <motion.div
            style={sectionStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={headingStyle}>Instructions for Using the MSA-DCA Tool</h3>
            <p style={paragraphStyle}>
              To generate an MSA or DCA based off of a protein sequence, click on the MSA-DCA tile on the front page. You’ll then be directed to enter your protein sequence and generate an MSA and DCA. The default settings are configured to generate both, but you can manually specify which ones to generate and where to store task IDs for these products in the MSA-DCA settings.
            </p>
          </motion.div>
          <motion.div
            style={sectionStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <img src={dcaImage} alt="DCA Guide" style={imageStyle} />
          </motion.div>
        </>
      ),
    },
    {
      title: 'SEEC Video',
      content: (

          <SEECVideo prefersDarkScheme={prefersDarkScheme}/>
      ),
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: prefersDarkScheme ? '#121212' : '#eaf1f8',
      }}
    >
      <UnifiedTopBar />
      <main style={{ flex: '1', paddingBottom: '80px' }}>
        <div style={{ paddingTop: '30px', paddingLeft: '20px', paddingRight: '20px' }}>
          <motion.div
            style={sectionStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 style={{ ...headingStyle, textAlign: 'center' }}>Guide for Biologists</h2>
            <p style={{ ...paragraphStyle, textAlign: 'center' }}>
              Hi! Welcome to the Morcos Lab DCA Server. Read below to understand how to use the algorithms available here as well as the math behind them.
            </p>
          </motion.div>
          <Tabs tabs={tabs} darkMode={prefersDarkScheme} />
        </div>
      </main>
      <footer
        style={{
          backgroundColor: prefersDarkScheme ? '#333' : '#C4CEDC',
          color: prefersDarkScheme ? '#f0f0f0' : '#333',
          padding: '20px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '16px',
          borderTop: '3px solid #ff6600',
        }}
      >
        <div style={{ flex: '1' }}>
          <p style={{ margin: 0 }}>Designed by Morcos Lab</p>
        </div>
        <div style={{ flex: '2', textAlign: 'center' }}>
          <a
            href="mailto:insert@gmail.com"
            style={{
              margin: '0 15px',
              color: prefersDarkScheme ? '#f0f0f0' : '#333',
              textDecoration: 'none',
            }}
          >
            insert@gmail.com
          </a>
          <a
            href="https://morcoslaboratory.org/"
            target="_blank"
            rel="noreferrer"
            style={{
              margin: '0 15px',
              color: prefersDarkScheme ? '#f0f0f0' : '#333',
              textDecoration: 'none',
            }}
          >
            About the Lab
          </a>
          <a
            href="https://www.moleculego.com/"
            target="_blank"
            rel="noreferrer"
            style={{
              margin: '0 15px',
              color: prefersDarkScheme ? '#f0f0f0' : '#333',
              textDecoration: 'none',
            }}
          >
            <FontAwesomeIcon icon={faAtom} /> MoleculeGo
          </a>
        </div>
        <div style={{ flex: '1', textAlign: 'right' }}>
          <a href="https://www.utdallas.edu/" target="_blank" rel="noreferrer">
            <img src={UTDLogo} alt="UTD Logo" style={{ height: '40px' }} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Bioguide;
