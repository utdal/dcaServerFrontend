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

function Introvid() {
  return (
    <div>
      <div style={styles.header}>
        <div style={styles.homeButtonContainer}>
          <HomeButton />
        </div>
        <span style={styles.title}>Additional Info</span>
      </div>
    </div>
  );
}

export default Introvid;
