import React from 'react';
import UnifiedTopBar from '../components/UnifiedTopBar';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import UTDLogo from './UTDLogo.png';

const About = () => {
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
            <h2 style={{ ...headingStyle, textAlign: 'center' }}>About the Morcos Laboratory</h2>
            <p style={{ ...paragraphStyle, textAlign: 'center' }}>
              Computational Biology • Protein Evolution • Structural Biology
            </p>
          </motion.div>

          <motion.div
            style={sectionStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={headingStyle}>Our Mission</h3>
            <p style={paragraphStyle}>
              The Morcos Laboratory is dedicated to understanding the fundamental principles of protein evolution and structure through computational approaches. Led by Dr. Faruck Morcos, Associate Professor and Cecil H. and Ida Green Professor in Systems Biology Science, our interdisciplinary team combines expertise from biological sciences, bioengineering, and physics to tackle complex biological questions.
            </p>
          </motion.div>

          <motion.div
            style={sectionStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 style={headingStyle}>Research Focus</h3>
            <p style={paragraphStyle}>
              Our laboratory specializes in developing and applying cutting-edge computational methods to study protein coevolution and molecular interactions. We focus on several key areas:
            </p>
            <ul style={paragraphStyle}>
              <li><strong>Direct Coupling Analysis (DCA):</strong> Inferring protein structure and interactions from evolutionary covariation patterns in sequence alignments</li>
              <li><strong>Protein Coevolution:</strong> Understanding how amino acid residues evolve together to maintain protein function and stability</li>
              <li><strong>Machine Learning Applications:</strong> Developing generative models and deep learning approaches for protein sequence analysis</li>
              <li><strong>Structural Biology:</strong> Predicting protein contacts and conformational changes through computational methods</li>
              <li><strong>Molecular Evolution:</strong> Studying evolutionary pressures and epistatic interactions in biological systems</li>
            </ul>
          </motion.div>

          <motion.div
            style={sectionStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 style={headingStyle}>Computational Tools & Resources</h3>
            <p style={paragraphStyle}>
              We develop and maintain several computational tools and web servers that make our research methods accessible to the broader scientific community:
            </p>
            <ul style={paragraphStyle}>
              <li><strong>Coevolving Pairs Server:</strong> Estimates protein structure using amino acid pairs that evolve together</li>
              <li><strong>Latent Generative Landscape (LGL):</strong> Models complex dependencies in sequence alignments by mapping high-dimensional structures to interpretable forms</li>
              <li><strong>ProSSpeC:</strong> Protease substrate specificity calculator for understanding enzyme-substrate interactions</li>
              <li><strong>SEEC:</strong> Sequence Evolution with Epistatic Contributions for modeling evolutionary dynamics</li>
            </ul>
          </motion.div>

          <motion.div
            style={sectionStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 style={headingStyle}>Impact & Applications</h3>
            <p style={paragraphStyle}>
              Our research has broad applications in understanding protein function, drug design, and evolutionary biology. By developing methods to predict protein contacts and interactions from sequence data alone, we enable researchers to study proteins that are difficult to characterize experimentally. Our work contributes to fields ranging from synthetic biology to personalized medicine.
            </p>
            <p style={paragraphStyle}>
              The laboratory maintains active collaborations with experimental groups and has published extensively in high-impact journals including Nature, Science, and PNAS. Our computational tools have been used by researchers worldwide to advance understanding of protein structure and evolution.
            </p>
          </motion.div>

          <motion.div
            style={sectionStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h3 style={headingStyle}>Team & Training</h3>
            <p style={paragraphStyle}>
              Our diverse team includes postdoctoral researchers, graduate students, and undergraduate researchers working across multiple disciplines. We are committed to training the next generation of computational biologists and provide mentorship in both theoretical and practical aspects of biological research.
            </p>
            <p style={paragraphStyle}>
              Located at The University of Texas at Dallas, we benefit from strong interdisciplinary collaborations and state-of-the-art computational resources. Our laboratory environment encourages innovation, scientific rigor, and collaborative problem-solving.
            </p>
          </motion.div>
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

export default About;
