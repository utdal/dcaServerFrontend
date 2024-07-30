import React from 'react';
import HomeButton from '../components/HomeButton';

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
  },
  title: {
    flex: 1,
    textAlign: 'center',
    margin: '0 auto',
  },
  homeButtonContainer: {
    position: 'absolute',
    left: '20px', 
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
        <p>This guide is designed to help biologists navigate our DCA tools.</p>
        <img src="path/to/your/guide_image.jpg" alt="Guide for Biologists" style={{ width: '80%', marginTop: '20px' }} />
      </div>
    </div>
  );
}

export default Bioguide;
