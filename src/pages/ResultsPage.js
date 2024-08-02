import React from 'react';
import { Link } from 'react-router-dom';
import HomeButton from '../components/HomeButton';

const ResultsPage = () => {
  const styles = {
    app: {
      textAlign: 'center',
      backgroundColor: '#d0d8e8',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    container: {
      backgroundColor: '#f8f8f8',
      padding: '20px',
      width: '90%',
      maxWidth: '1200px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      marginTop: '100px',
      textAlign: 'center',
      flexGrow: 1,
      position: 'relative',
      minHeight: 'calc(100vh - 100px)',
    },
    message: {
      fontSize: '24px',
      marginBottom: '40px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
    },
    button: {
      padding: '10px 20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: '#e0e0e0',
      transition: 'background-color 0.3s ease',
    },
    title: {
      flex: 1,
      textAlign: 'center',
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <HomeButton />
        <span style={styles.title}>DCA Server</span>
      </div>
      <div style={styles.container}>
        <p style={styles.message}>Your input was successfully processed</p>
        <div style={styles.buttonContainer}>
          <Link to="/coevolving-pairs">
            <button style={styles.button}>Submit Another Input</button>
          </Link>
          <Link to="/coevolving-pairs-results">
            <button style={styles.button}>View Results</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
