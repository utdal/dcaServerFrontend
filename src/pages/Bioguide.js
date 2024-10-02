import React from 'react';
import HomeButton from '../components/HomeButton';
import dcaImage from './dca.png';
import { faAtom} from '@fortawesome/free-solid-svg-icons'; // Import molecule/atom icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UTDLogo from './UTDLogo.png';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',  
    backgroundColor: '#282c34',
    padding: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  content: {
    paddingTop: '100px',
    textAlign: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    margin: '0 auto',
  },
  homeButtonContainer: {
    position: 'absolute',
    left: '20px', 
  },
  image: {
    width: '80%',
    marginTop: '20px',
  },
  paragraph: {
    textAlign: 'left',
    lineHeight: '1.6',
    fontSize: '18px',
    marginTop: '20px',
  },
  paragraph2: {
    textAlign: 'center',
    lineHeight: '1.6',
    fontSize: '18px',
    marginTop: '20px',
  }
};

function Bioguide() {
  return (
    <div>
      <div style={styles.header}>
        <div style={styles.homeButtonContainer}>
          <HomeButton />
        </div>
        <span style={styles.title}>Guide for Biologists</span>
      </div>
      <div style={styles.content}>
        <h2>Guide for Biologists</h2>
        <p style={styles.paragraph2}>
          Hi! Welcome to the Morcos Lab DCA Server. Read below to understand how to use the algorithms available here as well as the math behind them.
        </p>
        <h3>Basics to DCA</h3>
        <p style={styles.paragraph}>
          As organisms evolve, point mutations in genes encoding functional proteins may result in a nonsynonymous codon change. Nonsynonymous codon changes lead to an amino acid residue change in the encoded protein. If the residue is important in the structure and/or function of the protein, then selective pressure is increased upon other residues that stabilize the intramolecular or intermolecular interaction in the wild-type protein(s). Thus, secondary mutations occur in other residues that complement the initial mutation in order to re-stabilize the protein, interface, or maintain function. This is referred to as coevolution.
        </p>
        <p style={styles.paragraph}>
          Direct-coupling analysis (DCA) is a method that exploits the coevolution of the amino acid residues to infer intramolecular and intermolecular residue interactions. DCA is a global statistical inference model and has been used for the study of coevolution in protein sequences with the ability to disentangle direct correlations from indirect correlations. With the usage of DCA, an approximation of the global probability distribution estimated from a large amount of sequences could be modeled for a set of residual positions in a sequence. This model accurately estimates the direct covariations between any two variables, such as pairwise residues within sequence, multiple lineages or evolutionary history, while excluding secondary correlations between dependent variables.
        </p>
        <img src={dcaImage} alt="Guide for Biologists" style={styles.image} />
      <h3>Instructions for Using the MSA-DCA Tool:</h3>
      <p style={styles.paragraph}>
      To generate an MSA or DCA based off of a protein sequence, click on the MSA-DCA tile on the front page. You’ll then be directed to enter your protein sequence and generate an MSA and DCA. The default settings are configured to generate both, but you can manually specify which ones to generate and where to store task IDs for these products in the MSA-DCA settings. After clicking submit, you’ll be faced with a task page showing you all of your currently running tasks. When they complete, you can click on them and either download your MSA or open a page displaying your DCA results. To access past DCAs, go to the front page and click on the DCA Results tile. 
      </p>
      </div>
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
                      <FontAwesomeIcon icon={faAtom} /> MoleculeGo
                    </a>
                  </div>
                  <div className="footer-logo">
                    <a href="https://www.utdallas.edu/" target="_blank">
                      <img src={UTDLogo} alt="UTD Logo" className="utd-logo" />
                    </a>
                  </div>
                </footer>
    </div>
  );
}

export default Bioguide;
