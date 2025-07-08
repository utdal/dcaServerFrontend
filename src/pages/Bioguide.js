import React from 'react';
import HomeButton from '../components/HomeButton';
import dcaImage from './dca.png';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UTDLogo from './UTDLogo.png';
import UnifiedTopBar from '../components/UnifiedTopBar';
import { motion } from 'framer-motion';
import nsfLogo from './nsfLogo.webp';
import RiceLogo from './rice-logo.png';

const sectionStyle = {
  backgroundColor: '#f4f8fc',
  borderRadius: '16px',
  padding: '30px',
  margin: '50px auto',
  maxWidth: '900px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
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
  color: '#333',
  marginBottom: '20px',  // 👈 Add this line
};



const imageStyle = {
  width: '100%',
  borderRadius: '12px',
  marginTop: '20px',
};

function Bioguide() {
  return (
    <div style={{ backgroundColor: '#eaf1f8', minHeight: '100vh'}}>
      <UnifiedTopBar />
      <main>

        <motion.div style={sectionStyle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 style={{ ...headingStyle, textAlign: 'center' }}>Guide for Biologists</h2>
          <p style={{ ...paragraphStyle, textAlign: 'center' }}>
            Hi! Welcome to the Morcos Lab DCA Server. Read below to understand how to use the algorithms available here as well as the math behind them.
          </p>
        </motion.div>

        <motion.div style={sectionStyle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 style={headingStyle}>Basics to DCA</h3>
          <p style={paragraphStyle}>
          As organisms evolve, point mutations in genes encoding functional proteins may result in a nonsynonymous codon change. Nonsynonymous codon changes lead to an amino acid residue change in the encoded protein. If the residue is important in the structure and/or function of the protein, then selective pressure is increased upon other residues that stabilize the intramolecular or intermolecular interaction in the wild-type protein(s). Thus, secondary mutations occur in other residues that complement the initial mutation in order to re-stabilize the protein, interface, or maintain function. This is referred to as coevolution. </p>
          <p></p>
          <p style={paragraphStyle}>
          Direct-coupling analysis (DCA) is a method that exploits the coevolution of the amino acid residues to infer intramolecular and intermolecular residue interactions. DCA is a global statistical inference model and has been used for the study of coevolution in protein sequences with the ability to disentangle direct correlations from indirect correlations. With the usage of DCA, an approximation of the global probability distribution estimated from a large amount of sequences could be modeled for a set of residual positions in a sequence. This model accurately estimates the direct covariations between any two variables, such as pairwise residues within sequence, multiple lineages or evolutionary history, while excluding secondary correlations between dependent variables.   </p>
        </motion.div>

        <motion.div style={sectionStyle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <img src={dcaImage} alt="Guide for Biologists" style={imageStyle} />
        </motion.div>

        <motion.div style={sectionStyle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h3 style={headingStyle}>Instructions for Using the MSA-DCA Tool</h3>
          <p style={paragraphStyle}>
          To generate an MSA or DCA based off of a protein sequence, click on the MSA-DCA tile on the front page. You’ll then be directed to enter your protein sequence and generate an MSA and DCA. The default settings are configured to generate both, but you can manually specify which ones to generate and where to store task IDs for these products in the MSA-DCA settings. After clicking submit, you’ll be faced with a task page showing you all of your currently running tasks. When they complete, you can click on them and either download your MSA or open a page displaying your DCA results. To access past DCAs, go to the front page and click on the DCA Results tile. 
          </p>
        </motion.div>
      </main>

      <footer style={{
        backgroundColor: '#C4CEDC',
        color: '#333',
        padding: '20px 40px',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '16px',
        borderTop: '3px solid #ff6600',
      }}>
        <div style={{ flex: '1', textAlign:'left'}}>
          <p style={{ margin: 0 }}>Designed by Morcos Lab</p>
        </div>
        <div style={{ flex: '1', textAlign: 'center'}}>
          <a href="https://www.utdallas.edu/" target="_blank" rel="noopener noreferrer">
            <img src={UTDLogo} alt="UTD Logo" className="utd-logo" />
          </a>
          <a href="https://www.rice.edu/">
            <img src={RiceLogo} alt="Rice Logo" className='rice-logo'/>
          </a>
          <a href="https://nsf.gov/" target="_blank" rel="noopener noreferrer">
            <img src={nsfLogo} alt="NSF Logo" className="nsf-logo" />
          </a>
        </div>
        <div style={{textAlign: 'right'}}>
          <a href="mailto:insert@gmail.com" style={{ margin: '0 15px', color: '#333', textDecoration: 'none' }}>
            insert@gmail.com
          </a>
        </div>

      </footer>
    </div>
  );
}

export default Bioguide;
